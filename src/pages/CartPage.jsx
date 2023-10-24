import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function CartPage() {
    const dispatch = useDispatch()
    const storeCart = useSelector(val => val.cart);
    const navigate = useNavigate()
    const user = useSelector(val => val.IsAuth);

    useEffect(() => {
        if (!user.name) {
            navigate('/login')
        }
    }, [user])

    const handleAddtoCart = (val, id) => {
        const existingProduct = storeCart.find((item) => +item.id === +id);
        const existingProductremove = storeCart.find((item) => +item.rating.count === 1);

        if (existingProductremove && val == -1) {
            const updatedCart = storeCart.filter((item) => {
                return item.id !== +id
            });
            dispatch({ type: "UPDATECART", payload: updatedCart });
        } else if (existingProduct) {
            const updatedCart = storeCart.map((item) => {
                if (+item.id === +id) {
                    return {
                        ...item,
                        rating: {
                            ...item.rating,
                            count: item.rating.count + val,
                        },
                    };
                }
                return item;
            });
            dispatch({ type: "UPDATECART", payload: updatedCart });
        }

    }

    return (
        <div className='w-full px-auto bg-slate-100 pt-20 min-h-screen'>
            <div className='grid md:grid-cols-2 lg:grid-cols-5 gap-9 place-items-center my-8 md:mx-16 lg:mx-9'>
                {
                    storeCart?.map((item, i) => {
                        return <div
                            onClick={() => navigate(`/product/${item.id}`)}
                            key={i} className='w-[250px] shadow-lg p-5 bg-white rounded-md text-left cursor-pointer'>
                            <div className="h-[200px] w-[200px] bg-center bg-contain bg-no-repeat"
                                style={{ backgroundImage: `url(${item.image})` }}></div>
                            <div className='mt-5 flex flex-col gap-1'>
                                <p >{item?.title?.length > 23 ? item?.title?.slice(0, 23) + "..." : item?.title}</p>
                                <div className='flex gap-5'>
                                    <span>${item?.price}</span>
                                    <span className='bg-green-500 text-white font-semibold px-1 rounded-md pl-2'>{item?.rating?.rate}⭐</span>
                                </div>
                                <p >{item?.category}</p>
                                <div className='flex gap-6'>
                                    <p><span className='font-medium'>Quantity: </span> {item?.rating?.count}</p>
                                    <div className='flex gap-7'>
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddtoCart(1, item.id)
                                        }} className='w-7 h-6 rounded-full bg-slate-800 text-white pb-7'>+</button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddtoCart(-1, item.id)
                                            }}
                                            className='w-7 h-6 rounded-full bg-slate-800 text-white pb-7'>-</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default CartPage