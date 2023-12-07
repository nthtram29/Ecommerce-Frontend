import React, { useEffect, useState } from 'react';
import { Badge, Col, Image, Popover} from 'antd';
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperHeaderCart, WrapperHeaderLogo } from './style';
import { UserOutlined, CaretDownOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../service/UserService'
import { resetUser} from '../../app/slide/userSlide'
import Loading from '../LoadingComponent/Loading';
import { searchProduct } from '../../app/slide/productSlide';
import logoText from '../../assets/images/textlogo.jpg'

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const location = useLocation()
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [search, setSearch] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const order = useSelector((state)=> state.order)
  const [loading, setLoading] = useState(false)
  const handleNavigateLogin =() =>{
    navigate('/sign-in')
  }
  const handleLogout = async ()=>{
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])
  
 

  // const content = (
  //   <div>
  //     <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
  //     <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
  //   {user?.isAdmin && (
  //     <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lý website</WrapperContentPopup>
  //     ) }
  //   </div>
  // );

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (

        <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if(type === 'profile') {
      navigate('/profile-user')
    }else if(type === 'admin') {
      navigate('/system/admin')
    }else if(type === 'my-order') {
      navigate('/my-order',{ state : {
          id: user?.id,
          token : user?.access_token
        }
      })
    }else {
      handleLogout()
    }
    setIsOpenPopup(false)
  }


  const onSearch = (e) =>{
      setSearch(e.target.value)
      dispatch(searchProduct(e.target.value))
  }
  const handleDetailCart = () =>{
    if(!user?.id) {
      navigate('/sign-in', {state: location?.pathname})
  }else {
    navigate('/order')
  }
  }
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ccc'}}>
    <WrapperHeader>
      <Col span={8}>
        <WrapperHeaderLogo to='/'>
        {/* <Image src={logoImage} preview={false} alt='image-logo' height='100px' width='100px' /> */}
        <Image src={logoText} preview={false} alt='image-logo' width='120px' />
        {/* <span >Di&Di</span> */}
        </WrapperHeaderLogo>
        </Col>
        {!isHiddenSearch ? (
          <Col span={8} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <ButtonInputSearch 
                size="large"
                textButton="Tìm kiếm"
                placeholder="Tìm kiếm nhanh..."
                onChange = {onSearch}
                
            />
          </Col>
        ) : (<Col span={8}>

          </Col>) }
      
      <Col span={8} style={{display: 'flex',justifyContent: 'flex-end', gap: '20px', alignItems: 'center'}}>
        <>
        {!isHiddenCart && (
              <WrapperHeaderCart>
                <div onClick={ handleDetailCart} style={{cursor: 'pointer'}}>
                  {!user?.id ? (
                  <ShoppingCartOutlined style={{fontSize: '30px', marginLeft: '10px', color: '#4d4d4d'}}/>
                  ) : (
                  <Badge count={order?.orderItems?.length} size='small'>
                  <ShoppingCartOutlined style={{fontSize: '30px', marginLeft: '10px', color: '#4d4d4d'}}/>
                  </Badge>
                  )
                    
                  }
                
                  <span>Giỏ hàng</span>
                  </div>
              </WrapperHeaderCart>
            )}
        <Loading isLoading={loading}>
        <WrapperHeaderAccount>
          {userAvatar ? (
                  <img src={userAvatar} alt="avatar" style={{
                    height: '30px',
                    width: '30px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }} />
                ) : (
                  <UserOutlined style={{ fontSize: '30px' , color: '#4d4d4d'}} />
                )}
            {/* <UserOutlined style={{fontSize: '30px'}}/> */}
            {user?.access_token ? (
              <>
             
              <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div style={{ cursor: 'pointer',maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                  </Popover>
              </>
            ):(
              <div onClick={handleNavigateLogin} style={{cursor: 'pointer'}}>
                <span> Đăng nhập / Đăng ký </span>
              <div>
              <span> Tài khoản </span>
              <CaretDownOutlined />
                </div> 
            </div>
            )}
            
            </WrapperHeaderAccount>
            </Loading>
            
            
        </>
        </Col>
    </WrapperHeader>
    </div>
  )
}

export default HeaderComponent