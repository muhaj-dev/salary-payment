import React from 'react'
import Content from "../common/content";
import TitleHeader from "../common/TitleHeader";
import LightButton from '../common/Button/LightButton'

import { productData } from "../Data/Home"

const Product = () => {
  return (
    <div className="max-w-[1400px] w-[92%] mx-auto my-56">
        <div className="w-[90%]  laptop:w-[50%]">
            <TitleHeader text="Our Main Products"/>
            <Content text="You are here now, shop away!!" />
        </div>
      <div className="flex flex-wrap gap-5 justify-around mt-8">
        {productData.map((item) => (
            <div key={item.id} className="w-[250px]">
                <div className='w-[250px] h-[240px]'>
                    <img src={item.img} alt="coco" />
                </div>
                <div>
                    <p className='text-center text-[18px] font-[500]'>{item.name} </p>
                    <p className='text-center text-[18px] text-grey my-3'>{item.scale}</p>
                    <p className='text-center text-[18px] text-pink'>{item.amount}</p>
                </div>
            </div>
        ))}
      </div>
      <div className='mt-12 w-fit mx-auto'>
        <LightButton text="Make a booking today"/>
      </div>
    </div>
  )
}

export default Product