import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    const { user } = useSelector((store) => store.auth);

    const name = user.user.user;

    return (

        <nav className="bg-gray-800 px-4 py-2 h-full   ">
            <div className=" h-full flex items-center justify-between">
                <div className="flex-shrink-0">
                    <p className="text-white font-bold text-xl">{name}</p>
                </div>
                <div className="flex">
                    <NavLink to='/addcar' className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Car</NavLink>
                    <button className="bg-gray-600 text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                </div>
            </div>
        </nav>

    )
}

export default Navbar