import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Part from '../components/Part'
import { listParts } from '../actions/partActions'


const HomeScreen = () => {

  const dispatch = useDispatch()

  const partList = useSelector(state => state.partList)
  const { loading, error, parts} = partList
 
  useEffect(() => {
    dispatch(listParts())
  }, [dispatch])

  return (
    <>
      <h1>Search Parts</h1>
      {loading ? (<h2>Loading...</h2>) : error ? (<h3>{error}</h3>) : (
        <Row>
          {parts.map((part) => (
            <Col key={part._id} sm={12} md={6} lg={4} xl={3}>
              <Part part={part} />
            </Col>
          ))}
        </Row>
      )}
    </> 
  )
}

export default HomeScreen
