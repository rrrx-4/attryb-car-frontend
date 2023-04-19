import React, { useEffect, useState } from 'react'
import Formrow from '../components/Formrow'
import { useDispatch, useSelector } from 'react-redux';
import { createCar, getCarsByUser, setIsEditCar, updateCar } from '../features/car/carSlice';
import { useNavigate } from 'react-router-dom';

const initialState = {

    carName: '',
    description: '',
    price: '',
    mileage: '',
    colour: '',
    image: ''
}



const AddCar = () => {

    const [values, setValues] = useState(initialState);

    const { isEditCar, editCar } = useSelector((store) => store.car);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        if (isEditCar) {

            console.log('hh');

            const { carName, description, price, mileage, colour, image } = editCar;

            setValues({ carName, description, price, mileage, colour, image })

            // values.carName = editCar.carName;
            // values.colour = editCar.colour;
            // values.description = editCar.description;
            // values.mileage = editCar.mileage;
            // values.price = editCar.price;
            // values.image = editCar.image;

            // dispatch(setIsEditCar())

        }
    }, [])





    const onSubmit = (e) => {

        e.preventDefault();

        const { carName, description, price, mileage, colour, image } = values;

        if (!carName || !description || !price || !mileage || !colour || !image) {
            alert('All field are required');
            return;
        }


        if (editCar) {

            console.log();

            const _id = editCar._id

            dispatch(updateCar({ carName, description, price, mileage, colour, image, _id }));

            dispatch(getCarsByUser())

            navigate('/');

            return;
        }

        dispatch(createCar({ carName, description, price, mileage, colour, image }));

        setValues({ ...initialState, image: '' });
        dispatch(getCarsByUser())
        navigate('/');

    }




    const convertToBase64 = (img) => {

        return new Promise((resolve, reject) => {

            const fileReader = new FileReader();

            fileReader.readAsDataURL(img);

            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }

        })

    }


    const handleImg = async (e) => {

        const img = e.target.files[0];

        const base64 = await convertToBase64(img);

        setValues({ ...values, image: base64 });
        console.log('hh');
    }

    const handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        // console.log(name, value);

        setValues({ ...values, [name]: value });

    }

    return (

        <div className='flex items-center justify-center' >

            <form className='flex flex-col items-center justify-center' onSubmit={onSubmit}>

                <h3 className="text-xl font-bold text-gray-800 mb-4" > {isEditCar ? 'Edit Car' : ' Add Car'}</h3>

                <Formrow type='text' name='carName' value={values.carName} handleChange={handleChange} ></Formrow>

                <Formrow type='number' name='price' value={values.price}
                    handleChange={handleChange}></Formrow>

                <Formrow type='text' name='colour' value={values.colour} handleChange={handleChange}
                ></Formrow>

                <Formrow type='number' name='mileage' value={values.mileage} handleChange={handleChange} ></Formrow>

                <div>
                    <label className="mb-2 font-medium text-gray-800 mr-4" htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImg}
                        className="px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />


                    <img src={values.image}></img>


                </div>
                <div className='flex ' >
                    <label className="mb-2 font-medium text-gray-800 mr-4" htmlFor="description">Description:</label>
                    <textarea className="px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name='description'
                        value={values.description}
                        onChange={handleChange}
                    />
                </div>

                <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" type='submit'>submit</button>

            </form>
        </div>
    )
}

export default AddCar