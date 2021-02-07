import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMyOrders } from '../actions/orderActions'
import Meta from '../components/Meta'

const MyOrdersScreen = () => {


    const dispatch = useDispatch()

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading, error, orders} = orderListMy 


    useEffect(() => {
        dispatch(listMyOrders())
    }, [dispatch])

    const history = useHistory();

    const handleRowClick = (id) => {
        history.push(`/orders/${id}`)
    }  

    return (
        <>
            <Meta title={"Demands Database | Demands"}></Meta>
            <h1>Demands</h1>
            {loading ? (<Loader>Loading...</Loader>) : error ? (<Message variant='danger'>{error}</Message>) : (
            <Table className="table-dark table-hover" size='sm' bordered="true" responsive>
                <thead>
                <tr>
                    <th scope="col">Order No.</th>
                    <th scope="col">Order Date</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order._id} onClick={() => {handleRowClick(order._id)}}>
                        <td>{order._id}</td>
                        <td>{order.createdAt}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            )}
      </> 
    )
}

export default MyOrdersScreen
