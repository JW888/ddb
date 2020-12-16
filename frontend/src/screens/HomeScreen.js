import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Part from '../components/Part'
import axios from 'axios'


const HomeScreen = () => {
  const [parts, setParts] = useState([])

  useEffect(() => {
    const fetchParts = async () => {
      const {data} = await axios.get('/api/parts')
      setParts(data)
    }
    
    fetchParts()
  }, [])

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
