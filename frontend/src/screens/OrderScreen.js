import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
    getOrderDetails,
    deliverOrder,
} from '../actions/orderActions'
import {
    ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id
    
    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        if (!order || successDeliver || order._id !== orderId) {
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        }

    }, [dispatch, orderId, successDeliver, order, userInfo, history])


    const calcQtyOutstanding = () => {
        return order.orderItems.reduce((qtyTot, orderItem) => qtyTot + orderItem.qtyOutstanding, 0)
    }
    
    const calcQty = () => {
        return order.orderItems.reduce((qtyTot, orderItem) => qtyTot + orderItem.qty, 0)
    }

    const getStatus = () => {

        if (calcQtyOutstanding() === 0) {
            return "Full"
        } else if ( calcQtyOutstanding() === calcQty() ) {
            return "Open"
        } else {
            return "Partial"
        }

    }
    
    const deliverPartialHandler = (item) => {
        let qtyDelivered = parseInt(window.prompt('Enter additional qty delivered'))

        if (qtyDelivered === null) {
            return
        } else {

            if (qtyDelivered > item.qtyOutstanding){
                item.qtyOutstanding = 0
                item.qtyDelivered = item.qty
            } else {
                item.qtyOutstanding = item.qty - qtyDelivered
                item.qtyDelivered =item.qtyDelivered + qtyDelivered
            }

        }

        dispatch(deliverOrder(order, item, getStatus()))
    }

    const deliverFullHandler = (item) => {
        item.qtyOutstanding = 0
        item.qtyDelivered = item.qty
        dispatch(deliverOrder(order, item, getStatus()))
    }

    const deliverResetHandler = (item) => {
        item.qtyOutstanding = item.qty
        item.qtyDelivered = 0
        dispatch(deliverOrder(order, item, getStatus()))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (   
            <>
                <>
                    <Link className='btn btn-outline-primary my-3' to='/profile'>
                        To Demands
                    </Link>
                    <Row>
                        <Col md={6} sm={6} xs={6}>
                            <h1>Delivery Details</h1>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    
                                    {order.status === "Full" ? (
                                    <h4 className="text-success">{order.status}</h4>

                                    ) : order.status === "Partial" ? (
                                    <h4 className="text-warning">{order.status}</h4>
                                    ) : (
                                        <h4 className="text-danger">{order.status}</h4>
                                        )}
                                   
                                    <p>
                                        <strong>Demand No.: </strong> {order._id}
                                    </p>
                                    <p>
                                        <strong>Name: </strong> {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>{' '}
                                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                    </p>
                                    
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
                <br>
                </br>
                <>
                    <Row>
                        <Col>
                            <h1>Demand Items</h1>
                            <ListGroup variant='flush'>
                            {loadingDeliver && <Loader />}
                                <ListGroup.Item>
                                    
                                    {order.orderItems.length === 0 ? (
                                        <Message>Order is empty</Message>
                                    ) : (
                                        
                                        <Table className="table-dark table-hover" striped bordered responsive>
                                        <thead>
                                        <tr>
                                            <th scope="col">Order No.</th>
                                            <th scope="col">Item name</th>
                                            <th scope="col">DM Reg</th>
                                            <th scope="col">Tail</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Trade</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col">Out</th>
                                            <th scope="col">Del</th>
                                            {userInfo && userInfo.isAdmin && (
                                                <th scope="col">Delivery</th>
                                            )}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {order.orderItems.map((item) => (
                                            <tr key={item._id} >
                                                <td>{item._id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.dmReg}</td>
                                                <td>{item.tail}</td>
                                                <td>{item.location}</td>
                                                <td>{item.trade}</td>
                                                <td>{item.qty}</td>
                                                <td>{item.qtyOutstanding}</td>
                                                <td>{item.qtyDelivered}</td>
                                                {userInfo && userInfo.isAdmin && (
                                                    <td>
                                        
                                                        <Button 
                                                        type='button'
                                                        className='btn-sm btn-success mr-2'
                                                        onClick={() => {deliverFullHandler(item)}} 
                                                        
                                                        >
                                                            Full
                                                        </Button>
                                                        <Button
                                                        type='button'
                                                        className='btn-sm btn-warning mr-2'
                                                        onClick={() => deliverPartialHandler(item)}
                                                        >
                                                            Part
                                                        </Button>
                                                        <Button
                                                        type='button'
                                                        className='btn-sm btn-danger'
                                                        onClick={() => deliverResetHandler(item)}
                                                        >
                                                            None
                                                        </Button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                        )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            </>
        )
}

export default OrderScreen