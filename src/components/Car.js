import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { deleteCar, setCar, setIsEditCar } from '../features/car/carSlice';

const Car = ({ car }) => {

    const { carName, colour, description, image, mileage, price } = car;

    const { isEditCar, editCar } = useSelector((store) => store.car);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEditClick = (curr_car) => {

        dispatch(setCar(curr_car));
        dispatch(setIsEditCar());

        navigate('/addCar');

    }

    const handleDelete = (curr_car) => {

        const id = curr_car._id;

        dispatch(deleteCar(id));

        navigate('/');

    }


    return (

        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-5">
            <div className="flex items-center justify-center">
                <img src={image} alt="Car Image" className="w-1/3 object-cover" />
                <div className="w-2/3 p-4">
                    <h2 className="text-xl font-bold"> {carName}</h2>
                    <p className="text-gray-700 text-base">Price: {price}</p>
                    <p className="text-gray-700 text-base">Mileage: {mileage} miles</p>
                    <p className="text-gray-700 text-base">Color: {colour}</p>
                    <div className="mt-4 flex">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleEditClick(car)} >
                            Edit
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(car)} >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <hr className="my-2" />
            <div className="p-4">
                <p className="text-gray-700 text-base">{description}</p>
            </div>
        </div>
    )
}

export default Car