import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function Navbar() {

    const navigate = useNavigate()
    const [active, setActive] = useState('home');
    const User = useSelector(val => val.IsAuth);
    const [toggle, setToggle] = useState(false)
    const storeCart = useSelector(val => val.cart);
    const user = useSelector(val => val.IsAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        setActive(window.location.pathname)
    }, [window.location.pathname])

    const handleLogout = () => {
        setToggle(!toggle)
    }

    return (
        <div className='flex justify-between px-4 md:px-10 py-5 w-full fixed bg-white shadow font-medium'>
            <p className='px-4 py-1 bg-orange-500 text-white rounded-full'>LOGO</p>
            <div className='flex gap-4 md:gap-9 relative'>
                <p onClick={() => navigate('/')}
                    className={`cursor-pointer px-2 md:px-4 py-1  ${active == '/' ? 'border-2 border-white border-b-slate-900' : ''}`}>
                    Home
                </p>
                <p onClick={() => navigate('/cart')}
                    className={`cursor-pointer px-2 md:px-4 py-1 relative ${active == '/cart' ? 'border-2 border-white border-b-slate-900' : ''}`}>
                    {
                        storeCart?.length > 0 && user.name ? <div className='absolute text-white px-[9px] bg-red-600 opacity-70 rounded-full right-0 -top-[1px]'>
                            <button className=''>{storeCart.length}</button>
                        </div> : null
                    }
                    Cart
                </p>
                {
                    User.name ? <p onClick={handleLogout}
                        className={`cursor-pointer text-xl px-2 text-white rounded bg-slate-600`}>
                        {User.name}
                    </p> :
                        <p onClick={() => navigate('/login')}
                            className={`cursor-pointer px-2 md:px-4 py-1  ${active == '/login' || active === '/register' ? 'border-2 border-white border-b-slate-900' : ''}`}>
                            Login/Register
                        </p>
                }
                {
                    toggle && <div onClick={() => {
                        dispatch({ type: 'LOGOUT' });
                        setToggle(false)
                    }} className='absolute text-white px-2 py-1 bg-red-600 rounded-xl right-1 top-12'>
                        <button className=''>Logout</button>
                    </div>
                }

            </div>

        </div>
    )
}

export default Navbar