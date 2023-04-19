import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCarsByUser } from '../features/car/carSlice';
import Car from '../components/Car';
import Sidebar from '../components/Sidebar.js';

const AllCars = () => {

    const dispatch = useDispatch();

    const { allcars, loading } = useSelector(store => store.car);

    console.log(allcars);


    useEffect(() => {

        const price = '';
        const colour = '';
        const mileage = '';

        dispatch(getCarsByUser({ price, colour, mileage }));

        // console.log(allCars);

    }, [])


    return (
        <div className='flex flex-row h-full ' >

            <Sidebar  ></Sidebar>

            <div className='w-[80%] h-full  border-l-2 border-black ' >
                {
                    loading ? <h1>Loading...</h1> : (allcars?.length > 0 ? (allcars.map((car, idx) => {

                        return (
                            <Car key={idx} car={car}></Car>)

                    })) : (<h1>Empty</h1>)

                    )
                }
            </div>
        </div>

    )
}

export default AllCars