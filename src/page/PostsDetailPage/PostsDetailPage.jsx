import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PostsDetailComponent from '../../Component/PostsDetailComponent/PostsDetailComponent'
import Helmet from '../../Component/Helmet/Helmet'
import NavbarComponent from '../../Component/NavbarComponent/NavbarComponent'


const PostsDetailPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
  return (
    <>
    <Helmet title={"Chi tiết bài viết"}/>
    <NavbarComponent />
    <div style={{ height: '100%', background: `rgb(255,253,255)`, background: `linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 98%, rgba(247,244,244,1) 99%, rgba(217,201,201,1) 100%)`, width:'100%'}}>
       
    <div style={{ width: '1100px', margin: '0 auto', height:'100%'}}>
      <div style={{fontWeight: '500', margin: '0', padding: '20px 0'}}>
         <span style={{cursor: 'pointer'}} onClick={()=> {navigate('/posts')}}>Bài viết / </span> Chi tiết bài viết</div>
      
        <PostsDetailComponent idPosts={id}/>

    </div>
    
    </div>
    </>
  )
}

export default PostsDetailPage