import React from 'react';
import { Button } from 'antd';
import {SearchOutlined } from '@ant-design/icons'
import InputComponent from '../InputComponent/InputComponent';

const ButtonInputSearch = (props) => {
    const {size, placeholder, textButton,bordered, 
        width ='350px',
        colorButton = '#fff',
        backgroundColorInput = '#fff',
        backgroundColorButton ='#4d4d4d'} = props
  return (
    <div style={{display: 'flex', backgroundColor: '#fff'}}>
        <InputComponent
            size={size} 
            placeholder = {placeholder} 
            bordered = {bordered}
            style={{backgroundColor: backgroundColorInput, width: width}}
            {...props}
        />
        <Button 
            size={size} 
            bordered={bordered}
            style={{backgroundColor: backgroundColorButton, color: colorButton}}
            icon={<SearchOutlined style={{color: colorButton}}/> } >
                <span>{textButton}</span>
        </Button>

    </div>
  )
}

export default ButtonInputSearch