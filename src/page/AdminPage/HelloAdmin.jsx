import React from 'react'
import posterHello from '../../assets/images/helloAdmin2.png';
import { Image } from 'antd';

const HelloAdmin = () => {
  return (
    <>
    <Image src={posterHello} preview={false} alt='image-logo' height='auto' width='100%' />
    </>
  )
}

export default HelloAdmin