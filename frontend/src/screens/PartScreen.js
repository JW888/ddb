import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import axios from 'axios'

const PartScreen = ({ match }) => {
  
  const [part, setPart] = useState({})

  useEffect(() => {
    const fetchPart = async () => {
      const {data} = await axios.get(`/api/parts/${match.params.id}`)
      setPart(data)
    }
    fetchPart()
  }, [match])

  return (
    <>
      <Link className='btn btn-outline-primary my-3' to='/'>
        Go Back
      </Link>
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
                <Button
                  className='btn-block'
                  type='button'
                  disabled={part.countInStock === 0}
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
              <Col>Comments:</Col>
                  <Col>
                    {part.comments?`${part.comments[0].name} : ${part.comments[0].comment}`:"No Comments"} 
                  </Col>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PartScreen
