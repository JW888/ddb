import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import PartScreen from './screens/PartScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import OrderScreen from './screens/OrderScreen'
import MyOrdersScreen from './screens/MyOrdersScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import PartListScreen from './screens/PartListScreen'
import PartCreateScreen from './screens/PartCreateScreen'
import PartEditScreen from './screens/PartEditScreen'
import OrderListScreen from './screens/OrderListScreen'



const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/parts/:id' component={PartScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/orders/:id' component={OrderScreen} />
          <Route path='/myorders' component={MyOrdersScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/partlist' component={PartListScreen} />
          <Route path='/admin/part/create' component={PartCreateScreen} />
          <Route path='/admin/part/:id/edit' component={PartEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
