import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import DatePicker from "react-datepicker"
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

import "react-datepicker/dist/react-datepicker.css"

const CartScreen = ({match, location, history}) => {

    const partId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector (state => state.cart)

    const { cartItems } = cart

    useEffect(() => {

        if (partId) {
            dispatch(addToCart(partId, qty))
        }
        
    }, [dispatch, partId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        console.log("checkout")
    }

    const handleDateChange = () => {
        console.log("change date")
    }

    return (
        <>
            <Row>
                <Col>
                    <h1>Demands Cart</h1>
                </Col>
            </Row>   
            <Row>
                <Col md={8}>
                
                    {cartItems.length === 0 ? (
                        <Message>
                            Your cart is empty <Link to='/'>Go Back</Link>
                        </Message> ) : (
                            <ListGroup variant ='flush'>
                                {cartItems.map(item => (
                                    <ListGroup.Item key={item.part}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded></Image>
                                            </Col>
                                            <Col md={3}>
                                                <Row><Link to={`/parts/${item.part}`}>{item.name}</Link></Row>
                                                <Row>{`Part Number: ${item.partNumber}`}</Row>
                                                <Row>{`NIIN: ${item.niin}`}</Row>
                                            </Col>
                                            <Col md={2} >
                                                <Row>
                                                    <Form.Control className="mb-2" size="sm" as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.part, Number(e.target.value)))}>
                                                        {
                                                        [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Row>
                                                <Row>
                                                    <DatePicker className="datePicker" selected={new Date()} onChange={handleDateChange()} dateFormat='dd/MM/yy'/>
                                                </Row>
                                                <Row>
                                                    <DatePicker className="datePicker" selected={new Date()} onChange={handleDateChange()} dateFormat='dd/MM/yy'/>
                                                </Row>
                                            </Col>
                                            <Col className="text-right">
                                                <Button type='button' className="btn btn-danger btn-sm" onClick={() => (removeFromCartHandler(item.part))}><i className='fas fa-trash'></i> </Button>
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
                                <Button type='button' className="btn btn-success" onClick={() => (checkoutHandler)}>Submit Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CartScreen
