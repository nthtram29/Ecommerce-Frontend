import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form,  Select,  Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined  } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64, renderOptionDetails, renderOptions } from '../../utils'
import { useMutationHooks} from '../../hooks/useMutationHooks'
import * as ProductService from '../../service/ProductService'
import Loading from '../LoadingComponent/Loading';
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'
import * as message from '../Message/Message'


const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected , setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [typeSelect, setTypeSelect] = useState('')
  const user = useSelector((state) => state?.user)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const inittial = () => ({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: '',
    newType: '',
    discount: '',
  })
  const [stateProduct, setStateProduct] = useState(inittial())
  const [stateProductDetails, setStateProductDetails] = useState(inittial())
  const [form] = Form.useForm();
  const mutation = useMutationHooks(
    (data) => {
      const {
        name,
        price,
        description,
        rating,
        image,
        type,
        countInStock,
        discount 
      } = data
      const res = ProductService.createProduct({
        name,
        price,
        description,
        rating,
        image,
        type,
        countInStock,
        discount
      })
      return res
    }
  )

  const mutationUpdate = useMutationHooks(
    (data) => {
      const {
       id,
       token,
       ...rests
      } = data
      const res = ProductService.updateProduct(
        id,
        token,
        {...rests}
      )
      return res
    }
  )

  const mutationDeleted = useMutationHooks(
    (data) => {
      const {
       id,
       token
      } = data
      const res = ProductService.deleteProduct(
        id,
        token
      )
      return res
    }
  )

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const {
       token, ...ids
      } = data
      const res = ProductService.deleteManyProduct(
        ids,
        token
      )
      return res
    }
  )

  

  const getAllProducts = async () =>{
    const res = await ProductService.getAllProduct()
    return res
  }
  const fetchGetDetailsProduct = async (rowSelected) =>{
    const res = await ProductService.getDetailsProduct(rowSelected)
    if(res?.data){
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        rating: res?.data?.rating,
        type: res?.data?.type,
        image: res?.data?.image,
        countInStock: res?.data?.countInStock,
        discount: res?.data?.discount,
        selled: res?.data?.selled
      })
    }
    setIsLoadingUpdate(false)
  }

  // useEffect(()=>{
  //   form.setFieldsValue(stateProductDetails)
  // },[form, stateProductDetails])

  useEffect(() => {
    if(!isModalOpen) {
      form.setFieldsValue(stateProductDetails)
    }else {
      form.setFieldsValue(inittial())
    }
  }, [form, stateProductDetails, isModalOpen])

  useEffect(()=>{
    if(rowSelected && isOpenDrawer){
      setIsLoadingUpdate(true)
      fetchGetDetailsProduct(rowSelected)
    }
  },[rowSelected, isOpenDrawer])

  const handleDetailsProduct = () =>{
    setIsOpenDrawer(true)
  }

  const handleDeleteManyProducts = (ids) =>{
    mutationDeletedMany.mutate({
      ids: ids, token: user?.access_token
    },{
    onSettled: () =>{
      queryProduct.refetch()
    }
  })
  }

  const fetchAllTypeProduct = async () =>{
    const res = await ProductService.getAllTypeProduct()
    return res
  }

  const {data, isLoading, isSuccess, isError}  = mutation
  const {data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated}  = mutationUpdate
  const {data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted}  = mutationDeleted
  const {data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany}  = mutationDeletedMany


  const queryProduct = useQuery({queryKey: ['products'], queryFn: getAllProducts})
  const typeProduct = useQuery({queryKey: ['type-products'], queryFn: fetchAllTypeProduct})
  
  const {isLoading: isLoadingProducts, data: products} = queryProduct
  const renderAction = () =>{
    return(
      <div>
        <DeleteOutlined style={{color: 'red', fontSize: '30px', cursor: 'pointer'}} onClick= { () => setIsModalOpenDelete(true)}/>
        <EditOutlined style={{color: 'orange', fontSize: '30px', cursor: 'pointer'}} onClick={handleDetailsProduct}/>
      </div>
    )
  }
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
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        sorter: (a,b) => a.name.length - b.name.length,
        ...getColumnSearchProps('name'),
        width: '30%'
    },
    {
        title: 'Giá tiền',
        dataIndex: 'price',
        sorter: (a,b) => a.price - b.price,
        filters: [
          {
            text: '>= 1000000',
            value: '>=',
          },
          {
            text: '< 1000000',
            value: '<',
          },
          
        ],
        // record.name.startsWith(value)
        onFilter: (value, record) =>{
          if(value === '>='){
            return record.price >= 1000000
          }
          return record.price < 1000000
        } ,
        // width: '30%',
      },
      {
        title: 'Số lượng hiện tại',
        dataIndex: 'countInStock',
      },
      {
      title: 'Đã bán',
      dataIndex: 'selled',
      },
      {
          title: 'Loại sản phẩm',
          dataIndex: 'type',
          width: '15%',
          sorter: (a,b) => a.type.length - b.type.length,
          ...getColumnSearchProps('type'),
      },
      {
          title: 'Giảm giá (%)',
          dataIndex: 'discount',
          filters: [
            {
              text: '>= 20%',
              value: '>=',
            },
            {
              text: '< 20%',
              value: '<',
            },
            
          ],
          // record.name.startsWith(value)
          onFilter: (value, record) =>{
            if(value === '>='){
              return Number(record.discount) >= 20
            }
            return Number(record.discount) < 20
          }
      },
    
    {
        title: 'Action',
        dataIndex: 'action',
        render: renderAction
    },
];
const dataTable = products?.data?.length && products?.data?.map((product) =>{
    return {...product, key: product._id}
})
  useEffect(() =>{
    if(isSuccess && data?.status === 'OK'){
      message.success()
      hanldeCancel()
    }else if(isError){
      message.error()
    }
  }, [isSuccess])

  useEffect(() =>{
    if(isSuccessDeletedMany && dataDeletedMany?.status === 'OK'){
      message.success()
    }else if(isErrorDeletedMany){
      message.error()
    }
  }, [isSuccessDeletedMany])

  useEffect(() =>{
    if(isSuccessDeleted && dataDeleted?.status === 'OK'){
      message.success()
      hanldeCancelDelete()
    }else if(isErrorDeleted){
      message.error()
    }
  }, [isSuccessDeleted])

  const hanldeCloseDrawer = () =>{
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: '',
      price: '',
      description: '',
      rating: '',
      type: '',
      image: '',
      countInStock: '',
      discount: ''
    })
    form.resetFields()
  };

  useEffect(() =>{
    if(isSuccessUpdated && dataUpdated?.status === 'OK'){
      message.success()
      hanldeCloseDrawer()
    }else if(isErrorUpdated){
      message.error()
    }
  }, [isSuccessUpdated])

  const hanldeCancelDelete =() =>{
    setIsModalOpenDelete(false)
  }
  const handleDeleteProduct =() =>{
    mutationDeleted.mutate({id: rowSelected, token: user?.access_token},{
      onSettled: () =>{
        queryProduct.refetch()
      }
    })
  }
 

  const hanldeCancel = () =>{
    setIsModalOpen(false);
    setStateProduct({
      name: '',
      price: '',
      description: '',
      rating: '',
      type: '',
      image: '',
      countInStock: '',
      discount: ''
    })
    form.resetFields()
  };
  const onFinish = () =>{
    const params = {
      name: stateProduct.name,
      price: stateProduct.price,
      description: stateProduct.description,
      rating: stateProduct.rating,
      type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
      image: stateProduct.image,
      countInStock: stateProduct.countInStock,
      discount: stateProduct.discount
    }
    mutation.mutate(params, {
      onSettled: () =>{
        queryProduct.refetch()
      }
    })
  }
  const handleOnChange = (e) =>{
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    })
  
  }
  const handleOnChangeDetails = (e) =>{
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value
    })
  
  }
  const handleOnchangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj );
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview
    })
  
}
const handleOnchangeAvatarDetails = async ({fileList}) => {
  const file = fileList[0]
  if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj );
  }
  setStateProductDetails({
    ...stateProductDetails,
    image: file.preview
  })

}

const onUpdateProduct = () =>{
  mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateProductDetails }, {
    onSettled: () =>{
      queryProduct.refetch()
    }
  })
}

const handleChangeSelect = (value) =>{
    setStateProduct({
      ...stateProduct,
      type: value
    })
}
const handleChangeSelectDetails = (value) =>{
  setStateProductDetails({
    ...stateProductDetails,
    type: value
  })
}
  return (
    <div style={{width: '1070px'}}>
        <WrapperHeader>QUẢN LÝ SẢN PHẨM</WrapperHeader>
        <div style={{marginTop: '10px'}}>
            <Button style={{height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed'}} onClick={ () => setIsModalOpen(true)} >
                <PlusOutlined style={{fontSize: '60px'}} />
            </Button>
        </div>
        
        <div style={{marginTop: '20px'}}> 
        
            <TableComponent handleDeleteMany={handleDeleteManyProducts} columns={columns} isLoading={isLoadingProducts} data={dataTable} onRow ={(record, rowIndex) =>{
               return{
                onClick: event => {
                  setRowSelected(record._id)
                }

              };
            }}
             
            />
            
        </div>
        
        <ModalComponent forceRender title='Thêm sản phẩm'  open={isModalOpen}  onCancel={hanldeCancel} footer={null} >
          <Loading isLoading={isLoading}>
          <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 18,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="on"
              form = {form}
            >
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ]}
              >
                <InputComponent style={{border: '1px solid #ccc'}} value={stateProduct.name} onChange={handleOnChange} name='name'/>
              </Form.Item>

              <Form.Item
                label="Loại sản phẩm"
                name="type"
                rules={[
                  {
                    required: true,
                    message: 'Please input your type!',
                  },
                ]}
              >
                <Select 
                  name="type"
                  value={stateProduct.type}
                  onChange={handleChangeSelect}
                  options={renderOptions(typeProduct?.data?.data)}
                />
              </Form.Item>
              {stateProduct.type === 'add_type' && (
                <Form.Item 
                  label="Loại sản phẩm"
                  name = "newType"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your type!',
                    },
                  ]}
                >
                  <InputComponent style={{border: '1px solid #ccc'}} value={stateProduct.newType} onChange={handleOnChange} name="newType"/>

                </Form.Item>
              )}
              <Form.Item
                label="Số lượng"
                name="countInStock"
                rules={[
                  {
                    required: true,
                    message: 'Please input your type!',
                  },
                ]}
              >
                <InputComponent style={{border: '1px solid #ccc'}} value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock"/>
              </Form.Item>

             
              <Form.Item
                label="Giá tiền"
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Please input your price!',
                  },
                ]}
              >
                <InputComponent style={{border: '1px solid #ccc'}} value={stateProduct.price} onChange={handleOnChange} name="price"/>
              </Form.Item>

              <Form.Item
                label="Rating"
                name="rating"
                rules={[
                  {
                    required: true,
                    message: 'Please input your rating!',
                  },
                ]}
              >
                <InputComponent style={{border: '1px solid #ccc'}} value={stateProduct.rating} onChange={handleOnChange} name="rating"/>
              </Form.Item>

              <Form.Item
                label="Giảm giá"
                name="discount"
                rules={[
                  {
                    required: true,
                    message: 'Please input your discount!',
                  },
                ]}
              >
                <InputComponent style={{border: '1px solid #ccc'}} value={stateProduct.discount} onChange={handleOnChange} name="discount"/>
              </Form.Item>

              <Form.Item
                label="Mô tả sản phẩm"
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please input your description!',
                  },
                ]}
              >
                <textarea style={{width: '100%', color: '#686161', fontSize: '14px', lineHeight: 1.5, border: '1px solid #ccc', borderRadius: '5px'}} value={stateProduct.description} onChange={handleOnChange} name="description"> </textarea>
                {/* <InputComponent style={{border: '1px solid #ccc'}} value={stateProduct.description} onChange={handleOnChange} name="description"/> */}
              </Form.Item>

              <Form.Item
                label="Hình ảnh"
                name="image"
                rules={[
                  {
                    required: true,
                    message: 'Please input your image!',
                  },
                ]}
              >
                 <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button style={{marginRight: '20px'}}>Select File</Button>
                        
                        {stateProduct?.image && (
                            <img src={stateProduct?.image} style={{
                                height: '60px',
                                width: '60px',
                               
                                objectFit: 'cover'
                            }} alt="image-product"/>
                        )}
                    </WrapperUploadFile>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 20,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Thêm
                </Button>
              </Form.Item>
          </Form>
          </Loading>
        </ModalComponent>
        <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width ='70%'>
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              style={{
                maxWidth: 800,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onUpdateProduct}
              autoComplete="on"
              form = {form} 
            >
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ]}
              >
                <InputComponent style={{border: '1px solid #ccc'}} value={stateProductDetails.name} onChange={handleOnChangeDetails} name='name'/>
              </Form.Item>

              <Form.Item
                label="Loại sản phẩm"
                name="type"
                rules={[
                  {
                    required: true,
                    message: 'Please input your type!',
                  },
                ]}
              >
                {/* <InputComponent style={{border: '1px solid #ccc'}} value={stateProductDetails.type} onChange={handleOnChangeDetails} name="type"/> */}
                <Select 
                  name="type"
                  value={stateProductDetails.type}
                  onChange={handleChangeSelectDetails}
                  options={renderOptionDetails(typeProduct?.data?.data)}
                />
              </Form.Item>
              <Form.Item
                label="Số lượng"
                name="countInStock"
                rules={[
                  {
                    required: true,
                    message: 'Please input your type!',
                  },
                ]}
              >
                <InputComponent style={{border: '1px solid #ccc'}} value={stateProductDetails.countInStock} onChange={handleOnChangeDetails} name="countInStock"/>
              </Form.Item>
              <Form.Item
                label="Đã bán"
                name="selled"
                
              >
                <span >{stateProductDetails.selled || 0}  </span>
                {/* <InputComponent style={{border: '1px solid #ccc'}} value={stateProductDetails.selled} onChange={handleOnChangeDetails} name="selled"/> */}
              </Form.Item>

              <Form.Item
                label="Giá tiền"
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Please input your price!',
                  },
                ]}
              >
                <InputComponent style={{border: '1px solid #ccc'}} value={stateProductDetails.price} onChange={handleOnChangeDetails} name="price"/>
              </Form.Item>

              <Form.Item
                label="Rating"
                name="rating"
                rules={[
                  {
                    required: true,
                    message: 'Please input your rating!',
                  },
                ]}
              >
                <InputComponent style={{border: '1px solid #ccc'}} value={stateProductDetails.rating} onChange={handleOnChangeDetails} name="rating"/>
              </Form.Item>
              
              <Form.Item
                label="Giảm giá"
                name="discount"
                rules={[
                  {
                    required: true,
                    message: 'Please input your discount of product!',
                  },
                ]}
              >
                <InputComponent style={{border: '1px solid #ccc'}} value={stateProductDetails.discount} onChange={handleOnChangeDetails} name="discount"/>
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please input your description!',
                  },
                ]}
              >
                <textarea style={{width: '100%', color: '#686161', fontSize: '14px', lineHeight: 1.5, border: '1px solid #ccc', borderRadius: '5px'}} value={stateProductDetails.description} onChange={handleOnChange} name="description"> </textarea>

                {/* <InputComponent style={{border: '1px solid #ccc'}} value={stateProductDetails.description} onChange={handleOnChangeDetails} name="description"/> */}
              </Form.Item>

              <Form.Item
                label="Hình ảnh"
                name="image"
                rules={[
                  {
                    required: true,
                    message: 'Please input your image!',
                  },
                ]}
              >
                 <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                            <Button style={{marginRight: '20px'}}>Select File</Button>
                        
                        {stateProductDetails?.image && (
                            <img src={stateProductDetails?.image} style={{
                                height: '60px',
                                width: '60px',
                               
                                objectFit: 'cover'
                            }} alt="image-product"/>
                        )}
                    </WrapperUploadFile>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 20,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
          </Form>
          </Loading>

        </DrawerComponent>

        <ModalComponent title='Xóa sản phẩm' open={isModalOpenDelete} onCancel={hanldeCancelDelete} onOk = {handleDeleteProduct}>
                <Loading isLoading={isLoadingDeleted}>
                  <div>Bạn có chắc muốn xóa sản phẩm này không?</div>
                </Loading>
        </ModalComponent>
    </div>
  )
}

export default AdminProduct