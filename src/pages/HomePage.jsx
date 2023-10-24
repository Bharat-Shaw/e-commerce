import React, { useEffect, useState } from 'react'
import { Allproducts } from '../objects/products'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function HomePage() {
  const navigate = useNavigate()
  const categorylist = ["Electronics", "Jewelery", "Men's clothing", "Women's clothing"]
  const [category, setCategory] = useState('Products');
  const [product, setProduct] = useState();
  const user = useSelector(val => val.IsAuth);

  useEffect(() => {
    if (!user.name) {
      navigate('/login')
    }
  }, [user])

  useEffect(() => {
    if (category == "Products") {
      setProduct(Allproducts)
    } else {
      const updatedproduct = Allproducts.filter((item) => {
        return item.category === category.toLowerCase()
      })
      setProduct(updatedproduct)
    }
  }, [category])

  return (
    <div className='w-full px-auto bg-slate-100 pt-20'>
      <div className='flex gap-1 sm:gap-2 md:mt-4 flex-wrap bg-slate-300 w-fit mx-4 md:mx-auto px-1 py-5 md:py-1 rounded-md shadow-sm'>
        <h2 onClick={() => setCategory('Products')} className={`cursor-pointer px-4 py-1 ${category == 'Products' ? "bg-slate-800 text-white rounded-md" : ''}`}>All Products</h2>
        {
          categorylist.map((cate, i) => {
            return <h2 key={i} onClick={() => setCategory(cate)} className={`cursor-pointer px-4 py-1 ${category == cate ? "bg-slate-800 text-white rounded-md" : ''}`}>{cate}</h2>
          })
        }
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-5 gap-9 place-items-center my-8 md:mx-16 lg:mx-9'>
        {
          product?.map((item, i) => {
            return <div onClick={() => navigate(`/product/${item.id}`)} key={i} className='w-[250px] shadow-lg p-5 bg-white rounded-md text-left cursor-pointer'>
              <div className="h-[200px] w-[200px] bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: `url(${item.image})` }}></div>
              <div className='mt-5 flex flex-col gap-1'>
                <p >{item.title.length > 23 ? item.title.slice(0, 23) + "..." : item.title}</p>
                <div className='flex gap-5'>
                  <span>${item.price}</span>
                  <span className='bg-green-500 text-white font-semibold px-1 rounded-md pl-2'>{item.rating.rate}⭐</span>
                </div>
                <p >{item.category}</p>
                <p >Quantity: {item.rating.count}</p>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default HomePage