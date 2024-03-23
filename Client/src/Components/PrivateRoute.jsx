import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const {currentUser} = useSelector((state) => state.user)
  // if the user is logged in then return the Outlet component else navigate to the signin page
  return currentUser?<Outlet/>:<Navigate to='/signin'/>
}

export default PrivateRoute
