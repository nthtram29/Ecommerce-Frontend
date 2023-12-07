
import { Upload } from "antd";
import  styled  from "styled-components";

export const WrapperHeader = styled.h2`
    text-align: center;
    margin: 0 400px 10px;
    border-bottom: 2px solid #ccc;
    padding: 20px 0 10px;
    font-weight: 500;
`
export const WrapperContentProfile = styled.div`
    font-size: 20px;
    display: flex;
    flex-direction: column;
    
    width: 400px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
    gap: 30px;
    box-shadow: 1px 10px 10px #ccc;
`
export const WrapperLabel = styled.label`
   color: #000;
   font-size: 12px;
   line-height: 30px;
   font-weight: 600;
   width: 60px;
   text-align: left;
`
export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
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
`