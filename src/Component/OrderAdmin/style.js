import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 14px;
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none
    }
    & .ant-upload-list-item {
        display: none;
    }
`

export const WrapperProduct = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px;
    box-shadow: rgb(241 204 243) 0px 8px 8px;
    height: 70px;
    align-items: center;
    padding: 0 20px;
`
export const WrapperProductItems = styled.div`
    display: flex;
    justify-content: space-between;
    width: 25%;
`
export const WrapperProductName = styled.div`
    font-weight: 400;
`
export const WrapperPrice = styled.div`
    color: #991111;
    font-weight: 600;
    padding-left: 10px;
`
export const WrapperAmount = styled.div`
    
    font-weight: 400;
`
export const WrapperItem = styled.span`
    
    font-weight: 500;
`

export const WrapperIsPaid = styled.p`
    
    font-weight: 600;
    color: #e70909;
    margin: 0 10px;
`
export const WrapperTotal = styled.p`
    
    display: flex;
    width: 35%;
    padding: 10px 10px 0 0;
`
