import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoginRegisterComp(props) {
    const [formDataRegister, setFormDataRegister] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [formDataLogin, setFormDataLogin] = useState({
        email: '',
        password: ''
    })
    const [toggle, setToggle] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const storeRegistered = useSelector(val => val.Registered)

    useEffect(() => {
        setToggle(props.val)
    }, [props])

    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        dispatch({ type: "REGISTER", payload: formDataRegister })
        navigate('/login')
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        if (storeRegistered.find(item => item.email == formDataLogin.email) && storeRegistered.find(item => item.password == formDataLogin.password)) {
            let user = storeRegistered.find(item => item.email == formDataLogin.email)
            dispatch({ type: 'AUTH', payload: user });
            navigate('/')
        } else {
            alert('Invalid credentials')
        }
    }

    return (
        <div className={`flex flex-col lg:flex-row w-full transition-all duration-1000 ease-in-out ${toggle ? "flex-row-reverse" : ""}`}>
            <div className='bg-blue-500 lg:w-[50%] h-[100vh] flex justify-center items-center'>
                {
                    toggle ?
                        <img width={'500px'} src="https://icon-library.com/images/registration-icon-png/registration-icon-png-6.jpg" alt="" />
                        :
                        <img width={'500px'} src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.png" alt="" />
                }
            </div>
            <div className='lg:w-[50%] h-[100vh] bg-slate-100 flex flex-col gap-3 justify-center items-center'>
                <div className='font-medium text-[30px]'>{toggle ? "Register here" : "Login here"}</div>
                {
                    toggle ? <form className='flex flex-col w-[80%] sm:w-[60%] h-[60vh] pt-14 border-2 border-slate-400 rounded-2xl p-9 gap-9 bg-white' onSubmit={handleRegisterSubmit}>
                        <input type="text" onChange={(e) => setFormDataRegister({ ...formDataRegister, name: e.target.value })} value={formDataRegister.name} required placeholder='Name' className='p-2 border border-white border-b-slate-700 outline-none' />
                        <input type="email" onChange={(e) => setFormDataRegister({ ...formDataRegister, email: e.target.value })} value={formDataRegister.email} required placeholder='Email' className='p-2 border border-white border-b-slate-700 outline-none' />
                        <input type="text" onChange={(e) => setFormDataRegister({ ...formDataRegister, password: e.target.value })} value={formDataRegister.password} required placeholder='Password' className='p-2 border border-white border-b-slate-700 outline-none' />
                        <input type="submit" className='bg-slate-600 font-medium text-white rounded-lg py-2 cursor-pointer' value={'Register'} />
                    </form>
                        :
                        <form className='flex flex-col w-[80%] sm:w-[60%] h-[45vh] pt-14 border-2 border-slate-400 rounded-2xl p-9 gap-10 bg-white' onSubmit={handleLoginSubmit}>
                            <input type="email" onChange={(e) => setFormDataLogin({ ...formDataLogin, email: e.target.value })} value={formDataLogin.email} required placeholder='Email' className='p-3 border border-white border-b-slate-700 outline-none' />
                            <input type="password" onChange={(e) => setFormDataLogin({ ...formDataLogin, password: e.target.value })} value={formDataLogin.password} required placeholder='Password' autoComplete='off' className='p-3 bg-white border border-white border-b-slate-700 outline-none' />
                            <input type="submit" className='bg-blue-500 font-medium text-white rounded-lg py-2 cursor-pointer' value={'Login'} />
                        </form>
                }
                {
                    toggle ?
                        <div className='font-medium'>Already Registered? <span className='text-blue-600 cursor-pointer' onClick={() => navigate('/login')}>Click here to Login</span></div>
                        :
                        <div className='font-medium'>Not Registered? <span className='text-blue-600 cursor-pointer' onClick={() => navigate('/register')}>Click here to Register</span></div>

                }
            </div>
        </div>
    )
}

export default LoginRegisterComp