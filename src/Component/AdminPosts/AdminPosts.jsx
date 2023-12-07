import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form,    Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined  } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64 } from '../../utils'
import { useMutationHooks} from '../../hooks/useMutationHooks'
import * as PostsService from '../../service/PostsService'
import Loading from '../LoadingComponent/Loading';
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'
import * as message from '../Message/Message'


const AdminPosts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected , setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  
  const user = useSelector((state) => state?.user)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const inittial = () => ({
    title: '',
    image: '',
    description: '',
    preview: '',
  })
  const [statePosts, setStatePosts] = useState(inittial())
  const [statePostsDetails, setStatePostsDetails] = useState(inittial())
  const [form] = Form.useForm();
  const mutation = useMutationHooks(
    (data) => {
      const {
        title,
        image,
        description,
        preview
      } = data
      const res = PostsService.createPosts({
        title,
        image,
        description,
        preview
      })
      return res
    }
  )


  const mutationDeleted = useMutationHooks(
    (data) => {
      const {
       id,
       token
      } = data
      const res = PostsService.deletePosts(
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
      const res = PostsService.deleteManyPosts(
        ids,
        token
      )
      return res
    }
  )

  

  const getAllPosts = async () =>{
    const res = await PostsService.getAllPosts()
    return res
  }
  const fetchGetDetailsPosts = async (rowSelected) =>{
    const res = await PostsService.getDetailsPosts(rowSelected)
    if(res?.data){
      setStatePostsDetails({
        title: res?.data?.title,
        image: res?.data?.image,
        description: res?.data?.description,
        preview: res?.data?.preview,
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

  const handleDeleteManyPosts = (ids) =>{
    mutationDeletedMany.mutate({
      ids: ids, token: user?.access_token
    },{
    onSettled: () =>{
      queryPosts.refetch()
    }
  })
  }

  

  const {data, isLoading, isSuccess, isError}  = mutation

  const {data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted}  = mutationDeleted
  const {data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany}  = mutationDeletedMany


  const queryPosts = useQuery({queryKey: ['postss'], queryFn: getAllPosts})
 
  
  const {isLoading: isLoadingPosts, data: postss} = queryPosts
  const renderAction = () =>{
    return(
      <div>
        <DeleteOutlined style={{color: 'red', fontSize: '30px', cursor: 'pointer'}} onClick= { () => setIsModalOpenDelete(true)}/>
        <EditOutlined style={{color: 'orange', fontSize: '30px', cursor: 'pointer'}} onClick={handleDetailsPosts}/>
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
        title: 'Title',
        dataIndex: 'title',
        sorter: (a,b) => a.title.length - b.title.length,
        ...getColumnSearchProps('title'),
        width: '30%'
    },
    {
        title: 'Preview',
        dataIndex: 'preview',
        sorter: (a,b) => a.preview - b.preview,
        ...getColumnSearchProps('preview'),
       
      },
    
    
    {
        title: 'Action',
        dataIndex: 'action',
        render: renderAction
    },
];
const dataTable = postss?.data?.length && postss?.data?.map((posts) =>{
    return {...posts, key: posts._id}
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
    setStatePostsDetails({
      title: '',
      image: '',
      description: '',
      preview: '',
      
    })
    form.resetFields()
  };

 

  const hanldeCancelDelete =() =>{
    setIsModalOpenDelete(false)
  }
  const handleDeletePosts =() =>{
    mutationDeleted.mutate({id: rowSelected, token: user?.access_token},{
      onSettled: () =>{
        queryPosts.refetch()
      }
    })
  }
 

  const hanldeCancel = () =>{
    setIsModalOpen(false);
    setStatePosts({
      name: '',
      image: '',
      description: '',
      preview: '',
     
    })
    form.resetFields()
  };
 
  const onFinish = () =>{
    const params = {
      title: statePosts.title,
      image: statePosts.image,
      description: statePosts.description,
      preview: statePosts.preview,
      
    }
    mutation.mutate(params, {
      onSettled: () =>{
        queryPosts.refetch()
      }
    })
  }

  const handleOnChange = (e) =>{
    setStatePosts({
      ...statePosts,
      [e.target.name]: e.target.value
    })
  
  }
  const handleOnChangeDetails = (e) =>{
    setStatePostsDetails({
      ...statePostsDetails,
      [e.target.name]: e.target.value
    })
  
  }
  const handleOnchangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj );
    }
    setStatePosts({
      ...statePosts,
      image: file.preview
    })
  
}
const handleOnchangeAvatarDetails = async ({fileList}) => {
  const file = fileList[0]
  if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj );
  }
  setStatePostsDetails({
    ...statePostsDetails,
    image: file.preview
  })

}



  return (
    <div style={{width: '1070px'}}>
        <WrapperHeader>QUẢN LÝ BÀI VIẾT</WrapperHeader>
        <div style={{marginTop: '10px'}}>
            <Button style={{height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed'}} onClick={ () => setIsModalOpen(true)} >
                <PlusOutlined style={{fontSize: '60px'}} />
            </Button>
        </div>
        
        <div style={{marginTop: '20px'}}> 
        
            <TableComponent handleDeleteMany={handleDeleteManyPosts} columns={columns} isLoading={isLoadingPosts} data={dataTable} onRow ={(record, rowIndex) =>{
               return{
                onClick: event => {
                  setRowSelected(record._id)
                }

              };
            }}
             
            />
            
        </div>
        
        <ModalComponent forceRender title='Thêm bài viết'  open ={isModalOpen}  onCancel={hanldeCancel} footer={null} >
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
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please input your title!',
                  },
                ]}
              >
                <InputComponent style={{border: '1px solid #ccc'}} value={statePosts.title} onChange={handleOnChange} name='title'/>
              </Form.Item>

              <Form.Item
                label="Preview"
                name="preview"
                rules={[
                  {
                    required: true,
                    message: 'Please input your preview!',
                  },
                ]}
              >
                <textarea style={{width: '100%', color: '#686161', fontSize: '14px', lineHeight: 1.5, border: '1px solid #ccc', borderRadius: '5px'}} value={statePosts.preview} onChange={handleOnChange} name="preview"> </textarea>
                 {/* <InputComponent style={{border: '1px solid #ccc'}} value={statePosts.preview} onChange={handleOnChange} name="preview"/> */}
              </Form.Item>
              
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please input your description!',
                  },
                ]}
              >
              <textarea style={{width: '100%', color: '#686161', fontSize: '14px', lineHeight: 1.5, border: '1px solid #ccc', borderRadius: '5px'}} value={statePosts.description} onChange={handleOnChange} name="description"> </textarea>
                {/* <InputComponent style={{border: '1px solid #ccc'}} value={statePosts.description} onChange={handleOnChange} name="description"/> */}
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
                        
                        {statePosts?.image && (
                            <img src={statePosts?.image} style={{
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
        <DrawerComponent title='Chi tiết bài viết' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width ='70%'>
        <Loading isLoading={isLoadingUpdate }>
          <Form
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              
              autoComplete="on"
              form = {form} 
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please input your title!',
                  },
                ]}
              >
                <span>{statePostsDetails.title} </span>
                {/* <InputComponent style={{border: '1px solid #ccc'}} value={statePostsDetails.title} onChange={handleOnChangeDetails} name='title'/> */}
              </Form.Item>

              
              <Form.Item
                label="Preview"
                name="preview"
                rules={[
                  {
                    required: true,
                    message: 'Please input your preview!',
                  },
                ]}
              >
                <span>{statePostsDetails.preview}</span>
                
              </Form.Item>
             
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please input your description!',
                  },
                ]}
              >
                 <span>{statePostsDetails.description}</span>
                {/* <InputComponent style={{border: '1px solid #ccc'}} value={statePostsDetails.description} onChange={handleOnChangeDetails} name="description"/> */}
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
                 <WrapperUploadFile  maxCount={1}>
                            
                        
                        {statePostsDetails?.image && (
                            <img src={statePostsDetails?.image} style={{
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
                
              </Form.Item>
          </Form>
          </Loading>

        </DrawerComponent>

        <ModalComponent title='Xóa sản phẩm' open={isModalOpenDelete} onCancel={hanldeCancelDelete} onOk = {handleDeletePosts}>
                <Loading isLoading={isLoadingDeleted}>
                  <div>Bạn có chắc muốn xóa bài viết này không?</div>
                </Loading>
        </ModalComponent>
    </div>
  )
}

export default AdminPosts