import React, { useState } from 'react'
import Formrow from './Formrow'
import { useDispatch } from 'react-redux';
import { getCarsByUser } from '../features/car/carSlice';

const initialState = {

    price: "",
    colour: "",
    mileage: "",

}


const Sidebar = () => {

    const [values, setValues] = useState(initialState);

    const dispatch = useDispatch()

    const handleSubmit = (e) => {

        e.preventDefault();

        const { price, colour, mileage } = values;

        dispatch(getCarsByUser({ price, colour, mileage }))

        setValues({ ...initialState })

    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        // console.log(name, value);

        setValues({ ...values, [name]: value });
    }

    return (
        <div className="flex flex-col h-full  w-[20%] " >

            <form onSubmit={handleSubmit} className="flex flex-col p-4">

                <Formrow type='number' name='price' value={values.price} handleChange={handleChange}  ></Formrow>

                <Formrow type='text' name='colour' value={values.colour} handleChange={handleChange} ></Formrow>

                <Formrow type='number' name='mileage' value={values.mileage} handleChange={handleChange} ></Formrow>

                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    Search
                </button>

            </form>

        </div>
    )
}

export default Sidebar