import { Button, Space, Table } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperTable } from './style'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { convertPrice } from '../../utils'


import * as OrderService from '../../service/OrderService'
import { useQuery } from '@tanstack/react-query'
import {  SearchOutlined } from '@ant-design/icons'
import {  useSelector } from 'react-redux'

import Loading from '../LoadingComponent/Loading'



const RevenueAdmin = () => {
  const user = useSelector((state) => state?.user)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  
  const getRevenue = async () =>{
    const res = await OrderService.getRevenue(user?.access_token)
    return res
  }
  

  const getRevenueByCustomers = async () => {
    const res = await OrderService.getRevenueByCustomers(user?.access_token)
    return res
  }
 


  const queryRevenueByCustomers = useQuery({ queryKey: ['revenues'], queryFn: getRevenueByCustomers })
  const queryRevenue = useQuery({ queryKey: ['revenue'], queryFn: getRevenue })

  const { isLoading: isLoadingOrders, data: revenues } = queryRevenueByCustomers
  const { isLoading: isLoadingReneveu, data: revenue } = queryRevenue

 
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
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
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    
  });

  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'userName',
      sorter: (a,b) => a.userName.length - b.userName.length,
        ...getColumnSearchProps('userName')
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      sorter: (a,b) => a.address.length - b.address.length,
        ...getColumnSearchProps('address')
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Tổng tiền đã mua',
      dataIndex: 'total'
    },
    
  ];
  const columnRevenue = [
    {
      title: 'Tổng doanh thu',
      dataIndex: 'totalAmount'
    }
  ]
  


  const dataTable = revenues?.data?.length && revenues?.data?.map((order) => {
   return { ...order, key: order._id, userName: order._id.fullName,  address: order._id.address, phone: order._id.phone, total: convertPrice(order.total)  }
})

const dataTable1 = revenue?.data?.length && revenue?.data?.map((re)  =>{
  return {...re, key: re._id, totalAmount: convertPrice(re.totalAmount) }
})


  

  return (
    <div style={{width: '1070px'}}>
      <WrapperHeader>THỐNG KÊ DOANH THU THEO KHÁCH HÀNG</WrapperHeader>
      
      <div style={{ marginTop: '50px' }}>
        <Loading isLoading={isLoadingReneveu}>
        <WrapperTable columns={columnRevenue} dataSource={dataTable1} />
        </Loading>
         <TableComponent  columns={columns} isLoading={isLoadingOrders} data={dataTable} /> 
        
         
      </div>
    </div>
  )
}

export default RevenueAdmin