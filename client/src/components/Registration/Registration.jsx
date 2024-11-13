import React, { useState } from 'react'
import './Registration.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/auth'
import { BASE_URL } from '../../server'
import { toast } from 'react-toastify'

const Registration = () => {
    const navigate = useNavigate()
    const { storeTokenInLS } = useAuth()

    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        mobile: "",
        email: "",
        password: "",
        address: "",
        aadharCardNumber: "",
    })

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    })

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const validateEmail = (email) => {
        // Simplified email validation regex
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    const validatePassword = (password) => {
        // Password validation regex
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordPattern.test(password);
    }

    const register = async () => {
        let formErrors = {}

        // Validate email
        if (!validateEmail(formData.email)) {
            formErrors.email = "Please enter a valid email address.";
        }

        // Validate password
        if (!validatePassword(formData.password)) {
            formErrors.password = "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.";
        }

        // Check if there are any validation errors
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // Proceed with registration if no validation errors
        let responseData;
        await fetch(`${BASE_URL}/api/v1/users/signup`, {
            method: "POST",
            headers: {
                Accepts: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then((res) => res.json()).then((data) => responseData = data)

        if (responseData.success) {
            toast.success('Registration Successful')
            storeTokenInLS(responseData.token)
            navigate('/login')
        } else {
            toast.error(responseData.errors)
        }
    }

    return (
        <div className='register'>
            <div className="register-container">
                <div className="image-holder"></div>
                <div className='form'>
                    <h2><strong>Register</strong></h2>
                    <input className='form-control' name='name' value={formData.name} onChange={changeHandler} type="text" placeholder='Enter Your Name' />
                    <input className='form-control' name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                    <input className='form-control' name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                    <input className='form-control' name='dob' value={formData.dob} onChange={changeHandler} type="date" placeholder='Date of Birth' />
                    <input className='form-control' name='address' value={formData.address} onChange={changeHandler} type="text" placeholder='Address' />
                    <input className='form-control' name='aadharCardNumber' value={formData.aadharCardNumber} onChange={changeHandler} type="text" placeholder='Aadhar Number' />
                    <input className='form-control' name='mobile' value={formData.mobile} onChange={changeHandler} type="text" placeholder='Contact Number' />
                    <button className='btn' onClick={register}>Continue</button>
                    <h2 className='already'>Already have an account? <span><Link to="/login">Login here</Link></span></h2>
                </div>
            </div>
        </div>
    )
}

export default Registration
