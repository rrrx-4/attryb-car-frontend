import React, { useEffect, useState } from 'react'
import Formrow from '../components/Formrow'
import { useSelector, useDispatch } from 'react-redux'
import { store } from '../store'
import { signin, signup } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}

const Register = () => {

    const { loading, user } = useSelector((store) => ({ ...store.auth }))

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [values, setValues] = useState(initialState);

    const handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setValues({ ...values, [name]: value })

    }


    const onSubmit = (e) => {

        e.preventDefault();

        const { name, email, password, isMember } = values;

        if (!email || !password || (!isMember && !name)) {
            alert('Please fill out all fields')
            return;
        }

        if (isMember) {

            dispatch(signin({ email, password }))
            return;
        }

        dispatch(signup({ name, email, password }))



    }

    const togglePage = () => {

        setValues({ ...values, isMember: !values.isMember })

    }

    useEffect(() => {

        if (user) {

            setTimeout(() => {
                navigate('/')
            }, 3000)


        }


    }, [user])


    return (
        <div className="flex items-center h-screen">

            <form className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-lg flex flex-col items-center" onSubmit={onSubmit} >

                <h3 className="text-xl font-bold text-gray-800 mb-4" >{values.isMember ? 'Login' : 'Register'}</h3>
                {
                    !values.isMember && <Formrow type='text' name='name' value={values.name} handleChange={handleChange}  ></Formrow>
                }

                <Formrow type='email' name='email' value={values.email} handleChange={handleChange} ></Formrow>
                <Formrow type='password' name='password' value={values.password} handleChange={handleChange} ></Formrow>

                <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" type='submit'  >submit</button>

                <p>
                    {
                        values.isMember ? 'Not a member yet?' : 'Already a member?'
                    }
                    <button type='button' onClick={togglePage} >{values.isMember ? 'Register' : 'Login'}</button>
                </p>

            </form>

        </div>
    )
}

export default Register