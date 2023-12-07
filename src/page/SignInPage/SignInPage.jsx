import React, {  useEffect } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperFormBox, WrapperSection, WrapperTextLight } from './style'
import InputFormComponent from '../../Component/InputFormComponent/InputFormComponent'
import ButtonComponent from '../../Component/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import logoImage from '../../assets/images/DiDii.jpg'
import {EyeFilled, EyeInvisibleFilled  } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom'
import * as UserService from '../../service/UserService'
import  { useState } from 'react'

import { useMutationHooks } from '../../hooks/useMutationHooks'
import Loading from '../../Component/LoadingComponent/Loading'
import * as message from '../../Component/Message/Message'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../app/slide/userSlide'
import Helmet from '../../Component/Helmet/Helmet'


const SignInPage = () => {
  // const [isShowPassword, setIsShowPassword]  = useState(false)
  const [isShowPassword]  = useState(false)
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user)
  const navigate = useNavigate()
  
  const mutation = useMutationHooks(
     data => UserService.loginUser(data)
  )
  const {data, isLoading, isSuccess, isError} = mutation

  useEffect(()=>{
    if(isSuccess && data.status==='OK'){
      message.success()
      if(location?.state){
        navigate(location?.state)
      }else{
        navigate('/')
      }
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
      if(data?.access_token){
        const decoded = jwt_decode(data?.access_token)
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      }
    }else if(isError){
      message.error()
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) =>{
    const storage = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storage)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token, refreshToken}))
     
  }
  
  const handleNavigateSignUp =() =>{
    navigate('/sign-up')
  }
  const handleOnChangeEmail =(value) =>{
    setEmail(value)
  }
  const handleOnChangePassword =(value) =>{
    setPassword(value)
  }
  const handleSignIn = () =>{
    mutation.mutate({
      email,
      password
    })
  }
  return (
    <>
    <Helmet title={"Đăng nhập"}/>
    <WrapperSection >
      <WrapperFormBox>
    {/* <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)'}}>
      <div style={{width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex'}}> */}
        <WrapperContainerLeft>
          <h1>Di&Di xin chào!</h1>
          <p>Đăng nhập hoặc Tạo tài khoản </p>
          <InputFormComponent style={{marginBottom: '10px'}} placeholder= 'abc@gmail.com' value={email} onChange={handleOnChangeEmail}/>
         
          <div style={{position: 'relative'}}>
            <span
              style={{
                // zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >
              {isShowPassword ? (
                <EyeFilled />
               ) : (
                <EyeInvisibleFilled />
              )}
            </span>
            <InputFormComponent placeholder="password" type ={isShowPassword ? 'text':'password'} value={password} onChange={handleOnChangePassword}/>
          </div>
          {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}
          <Loading isLoading={isLoading}>
          <ButtonComponent 
           disabled = {!email.length || !password.length }
           onClick={handleSignIn}
            
            size={40}
            styleButton={{
                background: 'rgb(8 8 8)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px'
            }}
            textButton={'Đăng nhập'}
            styleTextButton ={{color:'#fff', fontSize:'15px', fontWeight: '700'}} 
          />
          </Loading >
          <p><WrapperTextLight>Quên mật khẩu</WrapperTextLight></p>
          <p>Bạn chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>
        </WrapperContainerLeft>
        {/* <WrapperContainerRight>
          <Image src={logoImage} preview={false} alt='image-logo' height='203px' width='203px' />
          <h4> Mua sắm tại DIDIJIN</h4>
        </WrapperContainerRight> */}
        </WrapperFormBox>
        </WrapperSection>
        </>
      
  )
}

export default SignInPage