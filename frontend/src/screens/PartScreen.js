import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listPartDetails } from '../actions/partActions'

const PartScreen = ({ history, match }) => {

  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const partDetails = useSelector(state => state.partDetails)
  const { loading, error, part} = partDetails

  useEffect(() => {
    dispatch (listPartDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)

  }

  return (
    <>
      <Link className='btn btn-outline-primary my-3' to='/'>
        Go Back
      </Link>
      {loading ? (<Loader>Loading...</Loader>) : error ? (<Message variant='danger'>{error}</Message>) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={part.image} alt={part.item_name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item><h3>{part.item_name}</h3></ListGroup.Item>
                <ListGroup.Item>Part Number: {part.part_number}</ListGroup.Item>
                <ListGroup.Item>NIIN: {part.niin}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {part.countInStock > 0 ? `In Stock: ${part.countInStock}` : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                        {
                        [...Array(part.countInStock).keys()].map((x) => (
                          <option key={x+1} value={x+1}>{x+1}</option>
                        ))}
                        </Form.Control>
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
            <Col md={6} >
              <Card className='my-3 p-3 rounded'>
                <ListGroup.Item>
                  <Col><h5>Comments:</h5></Col>
                      <Col>
                        {part.comments ? part.comments.map((part) => {
                            return (<Col key={part._id}><Row>{`${part.name}: ${part.comment}`}</Row></Col>)
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
