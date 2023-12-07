

import { useQueries, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import HeaderComponent from "../../Component/HeaderComponent/HeaderComponent";
import Loading from "../../Component/LoadingComponent/Loading";
import { Menu } from "antd";
import AdminUser from '../../Component/AdminUser/AdminUser';
import AdminProduct from '../../Component/AdminProduct/AdminProduct';
import { getItem } from '../../utils';
import * as OrderService from '../../service/OrderService'
import * as UserService from '../../service/UserService'
import * as ProductService from '../../service/ProductService'
import * as PostsService from '../../service/PostsService'
import OrderAdmin from '../../Component/OrderAdmin/OrderAdmin';
import CustomizedContent from "./CustomizedContent";
import { UserOutlined ,AppstoreOutlined, ShoppingCartOutlined, AreaChartOutlined, BookOutlined } from '@ant-design/icons'
import HelloAdmin from "./HelloAdmin";
import { WrapperMenu } from "./style";
import RevenueAdmin from "../../Component/RevenueAdmin/RevenueAdmin";
import AdminPosts from "../../Component/AdminPosts/AdminPosts";
import Helmet from "../../Component/Helmet/Helmet";
const AdminPage = () => {
  const user = useSelector((state) => state?.user)
  

  const items = [
    getItem('Thống kê', 'statistic', <AreaChartOutlined />),
    getItem('Người dùng', 'user', <UserOutlined />),
    getItem('Sản phẩm', 'product', <AppstoreOutlined />),
    getItem('Đơn hàng', 'order', <ShoppingCartOutlined />),
    getItem('Bài viết', 'posts', <BookOutlined />),
    
  ];

  const [keySelected, setKeySelected] = useState('');
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    return {data: res?.data, key: 'orders'}
  }

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct()
    return {data: res?.data, key: 'products'}
  }

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token)
    return {data: res?.data, key: 'users'}
  }
  
  const getAllPostss = async () => {
    const res = await PostsService.getAllPosts(user?.access_token)
    return {data: res?.data, key: 'postss'}
  }
 

  
  const queries = useQueries({
    queries: [
      {queryKey: ['products'], queryFn: getAllProducts},
      {queryKey: ['users'], queryFn: getAllUsers},
      {queryKey: ['orders'], queryFn: getAllOrder},
      {queryKey: ['postss'], queryFn: getAllPostss},
    ]
  })

 
  // , staleTime: 1000 * 60
  const memoCount = useMemo(() => {
    const result = {}
    try {
      if(queries) {
        queries.forEach((query) => {
          result[query?.data?.key] = query?.data?.data?.length
        })

      }
    return result
    } catch (error) {
      return result
    }
  },[queries])

  

  
  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return (
          <AdminUser />
        )
      case 'product':
        return (
          <AdminProduct />
        )
      case 'order':
        return (
          <OrderAdmin />
        )
        case 'statistic':
            return (
              <>
              <Loading isLoading={memoCount && Object.keys(memoCount) &&  Object.keys(memoCount).length !== 4}>
              <CustomizedContent data={memoCount}  setKeySelected={setKeySelected} />
              </Loading>
              < RevenueAdmin />
              </>
            )
            case 'posts':
              return (
                <AdminPosts />
              )
      default:
        return <></>
    }
  }

  const handleOnCLick = ({ key }) => {
    setKeySelected(key)
  }
  
  return (
    <div>
    <Helmet title={"Admin"}/>
      <HeaderComponent isHiddenSearch isHiddenCart style={{display: 'flex', justifyContent: 'space-between'}} />
      <div style={{ display: 'flex',overflowX: 'hidden' , width: '1300px', margin: '0 auto', background: `rgb(255,253,255)`, 
    background: `linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 98%, rgba(247,244,244,1) 99%, rgba(217,201,201,1) 100%)` }}>
        <div style={{width: '200px'}}>
        <WrapperMenu 
          mode="inline"
         
          style={{
            background: `rgb(255,253,255)`, 
            background: `linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 98%, rgba(247,244,244,1) 99%, rgba(217,201,201,1) 100%)`,
            
          }}
          items={items}
          onClick={handleOnCLick}
        />
       </div>
        <div>
            {!keySelected && (
              <HelloAdmin />
            )}
         
          <div style={{padding: '15px', borderLeft: '2px solid #ccc'}}>
          {renderPage(keySelected)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage