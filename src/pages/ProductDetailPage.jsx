import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Allproducts } from '../objects/products';
import { useDispatch, useSelector } from 'react-redux';

function ProductDetailPage() {

  const { id } = useParams();
  const dispatch = useDispatch()
  const storeCart = useSelector(val => val.cart)
  const [product, setProduct] = useState(null);
  const navigate = useNavigate()
  const user = useSelector(val => val.IsAuth);

  useEffect(() => {
    if (!user.name) {
      navigate('/login')
    }
  }, [user])

  const handleAddtoCart = () => {

    const existingProduct = storeCart.find((item) => +item.id === +product.id);
    if (existingProduct) {
      const updatedCart = storeCart.map((item) => {
        if (+item.id === +product.id) {
          return {
            ...item,
            rating: {
              ...item.rating,
              count: item.rating.count + 1,
            },
          };
        }
        return item;
      });
      dispatch({ type: "UPDATECART", payload: updatedCart });
      alert('Cart updated')
    } else {
      const addedProduct = {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: {
          rate: product.rating.rate,
          count: 1,
        },
      };
      dispatch({ type: "CART", payload: addedProduct });
      alert('Product added')
    }
  }

  useEffect(() => {
    const foundProduct = Allproducts.find(product => product.id === +id);
    if (foundProduct) {
      setProduct(foundProduct)
    }
  }, [id])

  return (
    <div className='flex flex-col md:flex-row pt-[6%] justify-around px-4 lg:px-20 bg-slate-100 min-h-screen'>
      <div className='sm:w-[40%] h-[70vh] md:h-[40vh] mt-[10vh] md:mt-14 lg:mt-1 lg:h-[70vh] border p-5 bg-white flex justify-center items-center rounded-md shadow'>
        <div className='bg-center bg-contain bg-no-repeat h-[400px] w-[400px]'
          style={{ backgroundImage: `url(${product?.image})` }}></div>
      </div>
      <div className='sm:w-[60%] flex flex-col gap-6 text-lg p-11'>
        <p className='text-xl font-medium'>{product?.title}</p>
        <div className='flex gap-10'>
          <span>
            <span className='font-medium'>Price: </span>
            ${product?.price}
          </span>
          <span>
            <span className='font-medium'>Rating: </span>
            {product?.rating.rate}
          </span>
        </div>
        <p>
          <span className='font-medium'>Category: </span>
          {product?.category}
        </p>
        <p>
          <span className='font-medium'>Quantity: </span>
          {product?.rating.count}
        </p>
        <p className='w-11/12'>
          <span className='font-medium'>Description: </span>
          {product?.description}
        </p>
        <button onClick={handleAddtoCart}
          className='bg-slate-800 hover:bg-slate-700 w-9/12 mt-4 py-4 text-white font-semibold'>ADD TO CART</button>
      </div>
    </div>
  )
}

export default ProductDetailPage