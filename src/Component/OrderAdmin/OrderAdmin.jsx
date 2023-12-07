import { Button, Space } from 'antd'
import React from 'react'
import { WrapperHeader } from './style'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { convertPrice } from '../../utils'


import * as OrderService from '../../service/OrderService'
import { useQuery } from '@tanstack/react-query'
import {  SearchOutlined } from '@ant-design/icons'
import {  useSelector } from 'react-redux'
import { orderContant } from '../../contant'
import PieChartComponent from './PieChart'



const OrderAdmin = () => {
  const user = useSelector((state) => state?.user)
 

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    return res
  }


  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
  const { isLoading: isLoadingOrders, data: orders } = queryOrder

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
    //   dataIndex: 'paidAt',
    //   sorter: (a, b) => a.paidAt.length - b.paidAt.length,
    //   ...getColumnSearchProps('paidAt')
    // },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps('totalPrice')
    },
    
  ];
 

  const dataTable = orders?.data?.length && orders?.data?.map((order) => {
    
      
    return { ...order, key: order._id, userName: order?.shippingAddress?.fullName, 
      phone: order?.shippingAddress?.phone, address: order?.shippingAddress?.address, 
      paymentMethod: orderContant.payment[order?.paymentMethod],isPaid: order?.isPaid ? 'TRUE' :'FALSE',
      isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE', paidAt: order?.paidAt ,totalPrice: convertPrice(order?.totalPrice)}
  })


  

  return (
    <div style={{width: '1070px'}}>
      <WrapperHeader>QUẢN LÝ ĐƠN HÀNG</WrapperHeader>
      <div style={{height: 200, width:200}}>
        <PieChartComponent data={orders?.data} />
      </div>
      <div style={{ marginTop: '50px' }}>
         <TableComponent  columns={columns} isLoading={isLoadingOrders} data={dataTable} /> 
       
      </div>
    </div>
  )
}

export default OrderAdmin