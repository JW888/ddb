import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listPartDetails } from '../actions/partActions'
import DatePicker from "react-datepicker"

const PartScreen = ({ history, match }) => {

  const [qty, setQty] = useState(1)
  const [dmReg, setDmReg] = useState('DM001-A40-001')
  const [location, setLocation] = useState('Bay-1')
  const [trade, setTrade] = useState('AE')
  const [rdd, setRdd] = useState(new Date())

  const dispatch = useDispatch()

  const partDetails = useSelector(state => state.partDetails)
  const { loading, error, part} = partDetails

  useEffect(() => {
    dispatch (listPartDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}?dmreg=${dmReg}?location=${location}?trade=${trade}?rdd=${rdd.toISOString().split('T')[0]}`)

  }

  return (
    <>
      <Link className='btn btn-outline-primary my-3' to='/'>
        Go Back
      </Link>
      {loading ? (<Loader>Loading...</Loader>) : error ? (<Message variant='danger'>{error}</Message>) : (
        <>
          <Row>
            <Col md={4}>
              <Image src={part.image} alt={part.item_name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item><h3>{part.item_name}</h3></ListGroup.Item>
                <ListGroup.Item>Part Number: {part.part_number}</ListGroup.Item>
                <ListGroup.Item>NIIN: {part.niin}</ListGroup.Item>
                <ListGroup.Item>Stock On Hand: {part.countInStock > 0 ? `${part.countInStock}` : 'Out Of Stock'}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={5}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        <Form.Control as='input' value={qty} onChange={(e) => setQty(e.target.value)}>
                        {/* {
                        [...Array(part.countInStock).keys()].map((x) => (
                          <option key={x+1} value={x+1}>{x+1}</option>
                        ))} */}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>DM Reg:</Col>
                      <Col>
                        <Form.Control as='select' value={dmReg} onChange={(e) => setDmReg(e.target.value)}>
                          <option>DM001-A40-001</option>
                          <option>DM001-A40-002</option>
                          <option>DM001-A40-003</option>
                          <option>DM001-A40-004</option>
                          <option>DM001-A40-005</option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Location:</Col>
                      <Col>
                        <Form.Control as='select' value={location} onChange={(e) => setLocation(e.target.value)}>
                          <option>Bay-1</option>
                          <option>Bay-2</option>
                          <option>Bay-3</option>
                          <option>Bay-4</option>
                          <option>Bay-5</option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Trade:</Col>
                      <Col>
                        <Form.Control as='select' value={trade} onChange={(e) => setTrade(e.target.value)}>
                          <option>AE</option>
                          <option>AV</option>
                          <option>AST</option>
                          <option>ASF</option>
                          <option>NDT</option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>RDD:</Col>
                      <Col>
                        <DatePicker className="datePicker" selected={rdd} onChange={(e) => setRdd(e)} dateFormat='dd/MM/yy'/>
                      </Col>
                    </Row>
                  </ListGroup.Item>       
                  
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12} >
              <Card className='my-3 p-3 rounded'>
                <ListGroup.Item>
                  <Col><h5>Comments:</h5></Col>
                      <Col>
                        {part.comments ? part.comments.map((part) => {
                            return (<Col key={part._id}><Row><Col md={0.5}>{part.name}:</Col><Col md={11}>{part.comment}</Col></Row></Col>)
                        }) : "No Comments"}
                      </Col>
                </ListGroup.Item>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default PartScreen
