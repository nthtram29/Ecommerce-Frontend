

import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonComponent from '../../Component/ButtonComponent/ButtonComponent'
import InputFormComponent from '../../Component/InputFormComponent/InputFormComponent'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import * as UserService from '../../service/UserService'
import { useMutationHooks } from '../../hooks/useMutationHooks'
import Loading from '../../Component/LoadingComponent/Loading'
import * as message from '../../Component/Message/Message'
import { updateUser } from '../../app/slide/userSlide'
import { Button, Form, Upload } from 'antd'
import { UploadOutlined} from '@ant-design/icons'
import { getBase64 } from '../../utils'
import { WrapperTittle } from '../HomePage/style'
import ModalComponent from '../../Component/ModalComponent/ModalComponent'
import InputComponent from '../../Component/InputComponent/InputComponent'
import Helmet from '../../Component/Helmet/Helmet'

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        avatar: ''
      })
      const [form] = Form.useForm();

   
    const mutationUpdate = useMutationHooks(
        (data) => {
          const { id,
            token,
            ...rests } = data
          const res = UserService.updateUser(
            id,
            { ...rests }, token)
          return res
        },
      )
    
      const {isLoading, data, isSuccess} = mutationUpdate
    const dispatch = useDispatch()

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }
  
  

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
          ...stateUserDetails,
          [e.target.name]: e.target.value
        })
      }

    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
      }, [form, stateUserDetails])

    useEffect(() => {
        if(isOpenModalUpdateInfo) {
          setStateUserDetails({
            
            name: user?.name,
            address: user?.address,
            phone: user?.phone,
            avatar: user?.avatar
          })
        } 
      }, [isOpenModalUpdateInfo])

      const handleCancleUpdate = () => {
        setStateUserDetails({
          name: '',
          email: '',
          phone: '',
          isAdmin: false,
          avatar: ''
        })
        form.resetFields()
        setIsOpenModalUpdateInfo(false)
      }

      const handleUpdateInforUser = () => {
        const {name, address, phone, avatar} = stateUserDetails
        if(name && address && phone && avatar ){
            mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
            onSuccess: () => {
                message.success('Cập nhật thành công')
              dispatch(updateUser({name, address, phone, avatar}))
              setIsOpenModalUpdateInfo(false)
              handleGetDetailsUser(user?.id, user?.access_token)
            }
          })
        }
      }
      const handleUpdateInfo = () => {
        setIsOpenModalUpdateInfo(true)
      }
      const handleOnchangeAvatarDetails = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
        setStateUserDetails({
          ...stateUserDetails,
          avatar: file.preview
        })
    
      }
    
    return (
      <>
      <Helmet title={"Thông tin người dùng"}/>
      
        <div style={{ width: '100%', height: '100%', background: `rgb(255,253,255)`, background: `linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 98%, rgba(247,244,244,1) 99%, rgba(217,201,201,1) 100%)` }}>
        <div style={{ width: '1100px', margin: '0 auto', height: '100%'}}>
            <WrapperHeader>THÔNG TIN NGƯỜI DÙNG</WrapperHeader>
            {/* <Loading isLoading={isLoading}> */}
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor="name">Tên:</WrapperLabel>
                        <span  id="name" >{name}</span>    
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="email">Email:</WrapperLabel>
                        
                        <span  id="email" >{email}</span>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="phone">SĐT:</WrapperLabel>
                        <span  id="phone" >{phone}</span>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="address">Địa chỉ:</WrapperLabel>
                        <span  id="address" >{address}</span>
                       
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="avatar">Avatar:</WrapperLabel>
                        {avatar && (
                            <img src={avatar} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt="avatar"/>
                        )}
                        {/* <InputFormComponent style={{ width: '300px' }} id="avatar" value={avatar} onChange={handleOnchangeAvatar} /> */}
                       
                    </WrapperInput>
                   
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <ButtonComponent
                            onClick={handleUpdateInfo}
                            size={40}
                            styleButton={{
                                background:'#fff' ,
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textButton={'Cập nhật thông tin'}
                            styleTextButton={{ color: 'black', fontSize: '15px', fontWeight: '400' }}
                        ></ButtonComponent>
                        </div>
                </WrapperContentProfile>
            {/* </Loading> */}
           
            
            <ModalComponent title="Cập nhật thông tin cá nhân" open={isOpenModalUpdateInfo} onCancel={handleCancleUpdate} onOk={handleUpdateInforUser}>
        <Loading isLoading={isLoading}>
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            // onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent style={{border: '1px solid #ccc'}} value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>
            
            <Form.Item
              label="SĐT"
              name="phone"
              rules={[{ required: true, message: 'Please input your  phone!' }]}
            >
              <InputComponent style={{border: '1px solid #ccc'}} value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: 'Please input your  address!' }]}
            >
              <InputComponent  style={{border: '1px solid #ccc'}} value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
            </Form.Item>
            <Form.Item
                label="Avatar"
                name="avatar"
                rules={[
                  {
                    required: true,
                    message: 'Please input your avatar!',
                  },
                ]}
              >
                 <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                            <Button style={{marginRight: '20px'}}>Select File</Button>
                        
                        {stateUserDetails?.avatar && (
                            <img src={stateUserDetails?.avatar} style={{
                                height: '60px',
                                width: '60px',
                               
                                objectFit: 'cover'
                            }} alt="avatar"/>
                        )}
                    </WrapperUploadFile>
              </Form.Item>

          </Form>
        </Loading>
      </ModalComponent> 
        </div>
        </div>
        </>
    )
}

export default ProfilePage