import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const SharedLayout = () => {
    return (
        <div className='h-screen' >
            <div className='h-[10%]' >
                <Navbar></Navbar>
            </div>
            <div className='h-[90%]' >
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default SharedLayout