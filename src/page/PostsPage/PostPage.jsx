import React, { useState } from 'react'
import { WrapperButtonMore, WrapperProducts, WrapperTittle } from './style'
import Loading from '../../Component/LoadingComponent/Loading'
import PostsComponent from '../../Component/PostsComponent/PostsComponent'
import NavbarComponent from '../../Component/NavbarComponent/NavbarComponent'
import * as PostsService from '../../service/PostsService'
import { useQuery } from '@tanstack/react-query'
import Helmet from '../../Component/Helmet/Helmet'

const PostPage = () => {
    const [limit, setLimit] = useState(10)

    const fetchPostsAll = async (context) =>{
      const limit = context?.queryKey && context?.queryKey[1]
      const res = await PostsService.getAllPosts( limit)
        return res
    }

  

  const {isLoading, data: posts, isPreviousData} = useQuery(['posts', limit], fetchPostsAll, {retry: 3, retryDelay: 1000, keepPreviousData: true})
  
  return (
    <>
    <Helmet title={"Bài viết"}/>
    <NavbarComponent />
    <div className='body' style={{background: `rgb(255,253,255)`, background: `linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 98%, rgba(247,244,244,1) 99%, rgba(217,201,201,1) 100%)`}}>
    <div id='container' style={{width: '1100px', margin: '0 auto',  height: '100%', paddingTop: '6px'}}>
       
           <WrapperTittle>BÀI VIẾT</WrapperTittle>
           <Loading isLoading={isLoading }>
               <WrapperProducts>
                 {posts?.data?.map((post)=>{
                   return(
                     <PostsComponent 
                       key={post._id}
                       image={post.image}
                       title={post.title}
                       preview ={post.preview}
                      
                       id={post._id}
                     />
                   )
                 })}
                         
               </WrapperProducts>
    
       <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
       <WrapperButtonMore 
         textButton={isPreviousData ? 'Load more' : 'Xem thêm'} 
         type='outline' 
         disabled={posts?.total === posts?.data?.length || posts?.totalPage === 1}
         styleButton={{border: '1px solid rgb(77, 77, 77)', color: `${posts?.total === posts?.data?.length ? '#fff' : 'rgb(77, 77, 77)'}` , width: '240px', height:'38px', borderRadius: '4px'}}
         onClick={()=> setLimit((prev)=> prev + 5)}
         ></WrapperButtonMore>
       </div>
       </Loading>
 </div>
 </div>
 
 </>
  )
}

export default PostPage