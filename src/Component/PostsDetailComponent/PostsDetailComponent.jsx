

import { Col, Image, Rate, Row } from 'antd'
import React from 'react'
import { WrapperStyleImageSmall, WrapperStyleColImage, WrapperStyleNameProduct, WrapperStyleTextSell, WrapperPriceProduct, WrapperPriceTextProduct, WrapperAddressProduct, WrapperQualityProduct, WrapperInputNumber, WrapperBtnQualityProduct, WrapperStyleDescriptionProduct, WrapperStyleDescription } from './style'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as PostsService from '../../service/PostsService'
import { useQuery } from '@tanstack/react-query'
import Loading from '../LoadingComponent/Loading'


const PostsDetailComponent = ({idPosts}) => {

    const fetchGetDetailsPosts = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if(id) {
            const res = await PostsService.getDetailsPosts(id)
            return res.data
        }
    }

   
    
    const { isLoading, data: postsDetails } = useQuery(['posts-details', idPosts], fetchGetDetailsPosts, { enabled : !!idPosts})
   

    return (
        <Loading isLoading={isLoading}>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px', height:'100%' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <Image src={postsDetails?.image} alt="image prodcut" preview={false} />
                    
                </Col>
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>{postsDetails?.title}</WrapperStyleNameProduct>
                    <WrapperStyleDescription>
                    {postsDetails?.description}
                    </WrapperStyleDescription>
                   
                </Col>
                
                
            </Row >
            
        </Loading>
    )
}

export default PostsDetailComponent