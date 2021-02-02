import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listParts } from '../actions/partActions'

const HomeScreen = () => {

  const dispatch = useDispatch()

  const partList = useSelector(state => state.partList)
  const { loading, error, parts} = partList
 
  useEffect(() => {
    dispatch(listParts())
  }, [dispatch])

  const history = useHistory();

  const handleRowClick = (id) => {
    history.push(`/parts/${id}`)
  }  

  return (
    <>
      <h1>Search Parts</h1>
      {loading ? (<Loader>Loading...</Loader>) : error ? (<Message variant='danger'>{error}</Message>) : (
          <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Part Number</th>
              <th scope="col">NIIN</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part) => (
                <tr key={part._id} onClick={() => {handleRowClick(part._id)}}>
                    <td>{part.item_name}</td>
                    <td>{part.part_number}</td>
                    <td>{part.niin}</td>
                </tr>
            ))}
          </tbody>
        </Table>
      )}
    </> 
  )
}

export default HomeScreen