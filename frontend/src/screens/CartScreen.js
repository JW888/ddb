import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { createOrder } from '../actions/orderActions'

import "react-datepicker/dist/react-datepicker.css"

const CartScreen = ({ match, location, history }) => {

    const partId = match.params.id
    const qty = location.search ? Number(location.search.split('?')[1].split('=')[1]) : 1
    const dmReg = location.search ? location.search.split('?')[2].split('=')[1] : ""
    const tail = dmReg.slice(-7)
    const delLoc = location.search ? location.search.split('?')[3].split('=')[1] : ""
    const trade = location.search ? location.search.split('?')[4].split('=')[1] : ""
    const rdd = location.search ? location.search.split('?')[5].split('=')[1] : ""

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const { cartItems } = cart

    useEffect(() => {

        if (partId) {
            dispatch(addToCart(partId, qty, dmReg, tail, delLoc, trade, rdd))
        }

    }, [dispatch, partId, qty, dmReg, tail, delLoc, trade, rdd])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const editCartItemHandler = (cartItem) => {
        history.push(`/parts/${cartItem.part}`)
    }

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success } = orderCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        if (success) {
            history.push(`/orders/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const orderHandler = () => {

        dispatch(createOrder({
            orderItems: cartItems
        }))

    }

    return (
        <>
            <Row>
                <Col>
                    <h1>Demands Cart</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link className='btn btn-outline-primary my-3' to='/'>
                        Back To Parts Search
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col md={8}>

                    {cartItems.length === 0 ? (
                        <Message>
                            Your cart is empty <Link to='/'>Go Back</Link>
                        </Message>) : (
                            <ListGroup variant='flush'>
                                {cartItems.map(item => (
                                    <ListGroup.Item key={item.part}>
                                        <Row>
                                            <Col md={2} sm={2} xs={1} >
                                                <Image src={item.image} alt={item.name} fluid rounded></Image>
                                            </Col>
                                            <Col md={3} sm={3} xs={4}>
                                                <Row><Link to={`/parts/${item.part}`}>{item.name}</Link></Row>
                                                <Row>{`Part Number: ${item.partNumber}`}</Row>
                                                <Row>{`NIIN: ${item.niin}`}</Row>
                                            </Col>
                                            <Col md={6} sm={6} xs={4}>
                                                <Row>Qty:&nbsp;&nbsp;&nbsp;{item.qty}</Row>
                                                <Row>DM Reg:&nbsp;&nbsp;&nbsp;{item.dmReg}</Row>
                                                <Row>Tail:&nbsp;&nbsp;&nbsp;{item.tail}</Row>
                                                <Row>Location:&nbsp;&nbsp;&nbsp;{item.location}</Row>
                                                <Row>Trade:&nbsp;&nbsp;&nbsp;{item.trade}</Row>
                                                <Row>RDD:&nbsp;&nbsp;&nbsp;{item.rdd}</Row>
                                            </Col>
                                            <Col className="text-right">
                                                <Row>
                                                    <Button type='button' className="mt-2 btn btn-info btn-sm" onClick={() => (editCartItemHandler(item))}><i className='fas fa-edit'></i> </Button>
                                                </Row>
                                                <Row>
                                                    <Button type='button' className="mt-5 btn btn-danger btn-sm" onClick={() => (removeFromCartHandler(item.part))}><i className='fas fa-trash'></i> </Button>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )
                    }
                </Col>
                <Col>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order For ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items: </h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className="btn btn-success" onClick={orderHandler} disabled={cartItems.length === 0}>Submit Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CartScreen
