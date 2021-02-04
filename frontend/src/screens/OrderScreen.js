import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, Table } from 'react-bootstrap'
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

    const deliverHandler = () => {
        let qty_delivered = window.prompt('Enter qty delivered')

        console.log(qty_delivered)
        // dispatch(deliverOrder(order))
    }

    const handleRowClick = (id) => {
        history.push(`/orders/${id}`)
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
                                    
                                    {order.isDelivered ? (
                                    <h4 class="text-success">Status: {order.status}</h4>

                                    ) : (
                                    <h4 class="text-danger">{order.status}</h4>
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
                                            <th scope="col">Del</th>
                                            <th scope="col">Out</th>
                                            <th scope="col">Delivery</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {order.orderItems.map((item) => (
                                            <tr key={item._id} onClick={() => {handleRowClick(item._id)}}>
                                                <td>{item._id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.dmReg}</td>
                                                <td>{item.tail}</td>
                                                <td>{item.location}</td>
                                                <td>{item.trade}</td>
                                                <td>{item.qty}</td>
                                                <td>{item.qtyDelivered}</td>
                                                <td>{item.qtyOutstanding}</td>
                                                <td>
                                    
                                                    <Button 
                                                    type='button'
                                                    className='btn-sm btn-success mr-2'
                                                    onClick={deliverHandler}
                                                    >
                                                        Full
                                                    </Button>
                                                    <Button
                                                    type='button'
                                                    className='btn-sm btn-warning mr-2'
                                                    onClick={deliverHandler}
                                                    >
                                                        Part
                                                    </Button>
                                                    <Button
                                                    type='button'
                                                    className='btn-sm btn-danger'
                                                    onClick={deliverHandler}
                                                    >
                                                        None
                                                    </Button>
                                                </td>
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