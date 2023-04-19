import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

    const { user } = useSelector(store => store.auth)

    if (!user) {

        return <Navigate to='/register'></Navigate>

    }

    return children;
}

export default ProtectedRoute