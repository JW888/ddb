import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Part from '../components/Part'
import parts from '../parts'

const HomeScreen = () => {
  return (
    <>
      <h1>Search Parts</h1>
      <Row>
        {parts.map((part) => (
          <Col key={part._id} sm={12} md={6} lg={4} xl={3}>
            <Part part={part} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
