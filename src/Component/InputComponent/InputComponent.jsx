import React from 'react';
import {Input } from 'antd';

const InputComponent = ({size, width, placeholder, style, ...rests}) => {
  return (
    
        <Input 
            width={width}
            size={size} 
            placeholder = {placeholder} 
            bordered={true}
            style={style}
            {...rests}
        />
    
  )
}

export default InputComponent