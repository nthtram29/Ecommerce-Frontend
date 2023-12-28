import { Button, Form, Space } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { WrapperAmount, WrapperHeader, WrapperIsPaid, WrapperItem, WrapperPrice, WrapperProduct, WrapperProductItem, WrapperProductItems, WrapperProductName, WrapperTotal } from './style'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { convertPrice } from '../../utils'


import * as OrderService from '../../service/OrderService'
import { useQuery } from '@tanstack/react-query'
import {  SearchOutlined, EditOutlined } from '@ant-design/icons'
import {  useSelector } from 'react-redux'
import { orderContant } from '../../contant'
import PieChartComponent from './PieChart'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/Loading'



const OrderAdmin = () => {
  const user = useSelector((state) => state?.user)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected , setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
 

  const inittial = () => ({
      fullName: '',
        paymentMethod: '',
        name: '',
        amount: '',
        price: ''
  })
  const inittial1 = () => ({
   
      name: '',
      amount: '',
      price: ''
})
  
  const [statePostsDetails, setStatePostsDetails] = useState(inittial())
  const [stateProductDetails, setStateProductDetails] = useState([])
  const [form] = Form.useForm();
 

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    return res
  }
  const fetchGetDetailsPosts = async (rowSelected) =>{
    const res = await OrderService.getDetailsOrder(rowSelected)
    if(res?.data){

      setStateProductDetails(
           res?.data?.orderItems,
        )

   
    setStatePostsDetails({
      fullName: res?.data?.shippingAddress?.fullName,
      address: res?.data?.shippingAddress?.address,
      phone: res?.data?.shippingAddress?.phone,
      isPaid: res?.data?.isPaid,
      totalPrice: res?.data?.totalPrice,
      shippingPrice: res?.data?.shippingPrice,
      createdAt: res?.data?.createdAt,
      isDelivered: res?.data?.isDelivered,
      discountPrice: res?.data?.discountPrice,
      itemsPrice: res?.data?.itemsPrice
    })
  }
  setIsLoadingUpdate(false)
  }
  
  
    
  
  useEffect(() => {
    if(!isModalOpen) {
      form.setFieldsValue(statePostsDetails)
    }else {
      form.setFieldsValue(inittial())
    }
  }, [form, statePostsDetails, isModalOpen])

  useEffect(()=>{
    if(rowSelected && isOpenDrawer){
      setIsLoadingUpdate(true)
      fetchGetDetailsPosts(rowSelected)
     
    }
  },[rowSelected, isOpenDrawer])


  const handleDetailsPosts = () =>{
    setIsOpenDrawer(true)
  }
  const hanldeCloseDrawer = () =>{
    setIsOpenDrawer(false);
    setStatePostsDetails({
      userName: '',
      totalPrice: '',
      
      
    })
    form.resetFields()
  };

  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
  const { isLoading: isLoadingOrders, data: orders } = queryOrder

  const renderAction = () =>{
    return(
      <div>
        <EditOutlined style={{color: 'orange', fontSize: '30px', cursor: 'pointer'}} onClick={handleDetailsPosts}/>
      </div>
    )
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          // ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            // onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        // setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  
  });

  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'userName',
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps('userName')
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address')
    },
    {
      title: 'Đã thanh toán?',
      dataIndex: 'isPaid',
      sorter: (a, b) => a.isPaid.length - b.isPaid.length,
      ...getColumnSearchProps('isPaid')
    },
    {
      title: 'Đã giao hàng?',
      dataIndex: 'isDelivered',
      sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
      ...getColumnSearchProps('isDelivered')
    },
    {
      title: 'Hình thức thanh toán',
      dataIndex: 'paymentMethod',
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      ...getColumnSearchProps('paymentMethod')
    },
    
    // {
    //   title: 'Ngày đặt hàng',
    //   dataIndex: 'name',
    //   sorter: (a, b) => a.paidAt.length - b.paidAt.length,
    //   ...getColumnSearchProps('paidAt')
    // },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps('totalPrice')
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
  },
  ];
 

  const dataTable = orders?.data?.length && orders?.data?.map((order) => {
    
      
    return { ...order, key: order._id, userName: order?.shippingAddress?.fullName, 
      phone: order?.shippingAddress?.phone, address: order?.shippingAddress?.address, 
      paymentMethod: orderContant.payment[order?.paymentMethod],isPaid: order?.isPaid ? 'TRUE' :'FALSE',
      isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE', paidAt: order?.paidAt , totalPrice: convertPrice(order?.totalPrice)}
  })

  let dateAt = new Date(statePostsDetails.createdAt);
  dateAt.setHours(dateAt.getHours());
  let dateATT = dateAt.toLocaleString("en-US");
 

  return (
    <div style={{width: '1070px'}}>
      <WrapperHeader>QUẢN LÝ ĐƠN HÀNG</WrapperHeader>
      <div style={{height: 200, width:200}}>
        <PieChartComponent data={orders?.data} />
      </div>
      <div style={{ marginTop: '50px' }}>
         <TableComponent  columns={columns} isLoading={isLoadingOrders} data={dataTable} onRow ={(record, rowIndex) =>{
               return{
                onClick: event => {
                  setRowSelected(record._id)
                }

              };
            }}/> 
   
      </div>
      <DrawerComponent title='Chi tiết đơn hàng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width ='70%'>
        <Loading isLoading={isLoadingUpdate }>
          <div style={{display: 'flex'}}>
        <p>Họ tên: <WrapperItem> {statePostsDetails.fullName}</WrapperItem></p>
        <p style={{marginLeft: '30px'}}>Số điện thoại: <WrapperItem>{statePostsDetails.phone}</WrapperItem></p>
        </div>
        <div style={{display: 'flex'}}>
        <p>Địa chỉ: <WrapperItem>{statePostsDetails.address}</WrapperItem></p> 
        <p style={{marginLeft: '30px'}}>Ngày đặt hàng: <WrapperItem>{dateATT}</WrapperItem></p>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          Trạng thái: 
        {statePostsDetails.isPaid === true ? (
          <WrapperIsPaid>Đã thanh toán</WrapperIsPaid>
        ) : (
          <WrapperIsPaid>Chưa thanh toán</WrapperIsPaid>
        )}
        -
        {statePostsDetails.isDelivered === true ? (
          <WrapperIsPaid>Đã giao hàng</WrapperIsPaid>
        ) : (
          <WrapperIsPaid>Chưa giao hàng</WrapperIsPaid>
        )}
        </div>
             
             <WrapperTotal>Tạm tính: 
             <WrapperPrice>{convertPrice(statePostsDetails.itemsPrice)}
             </WrapperPrice></WrapperTotal>
             <WrapperTotal>Giảm giá: 
             <WrapperPrice>{convertPrice(statePostsDetails.discountPrice)}
             </WrapperPrice></WrapperTotal>
             <WrapperTotal>Phí vận chuyển:
             <WrapperPrice> {convertPrice(statePostsDetails.shippingPrice)}
             </WrapperPrice>
             </WrapperTotal>
             <WrapperTotal>Tổng tiền: 
             <WrapperPrice>{convertPrice(statePostsDetails.totalPrice)}
             </WrapperPrice></WrapperTotal>
             
          
              <div style={{display: 'flex', justifyContent: 'space-between', margin: '0 70px', alignItems: 'center'}}>
              <WrapperProductName>Tên sản phẩm</WrapperProductName>
              <WrapperProductItems>
              <p>Số lượng</p>
              <p>Giá</p>
              </WrapperProductItems>
              </div>
               {
               stateProductDetails?.map((item)=>{
                return(
                  <WrapperProduct >
                    <WrapperProductName>{item.name}</WrapperProductName>
                    <WrapperProductItems>
                    <WrapperAmount>{item.amount}</WrapperAmount>
                    <WrapperPrice>{convertPrice(item.price)}</WrapperPrice>
                    </WrapperProductItems>
                    </WrapperProduct>
                )
                })
              }
             
              
          </Loading>

        </DrawerComponent>

    </div>
  )
}

export default OrderAdmin