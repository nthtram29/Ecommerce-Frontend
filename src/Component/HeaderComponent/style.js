import { Row } from "antd";
import { Link } from "react-router-dom";
import styled  from "styled-components";


export const WrapperHeader = styled(Row)`
    padding: 10px 10px;
    color: #4d4d4d;
   //  gap: 16px;
    flex-wrap: nowrap;
    width: 1100px;
    margin: 0 auto
  

`
export const WrapperHeaderLogo = styled(Link)`
   font-size: 25px;
   font-weight: bold;
   text-align: left;
   display: flex;
   justify-content:flex-start;
   align-items: center;
`
export const WrapperHeaderAccount = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
   font-size: 14px

`
export const WrapperHeaderCart = styled.div`
display: flex;
align-items: center;
gap: 10px;
font-size: 14px

`
export const WrapperContentPopup = styled.p`
   cursor: pointer;
   &:hover{
      background: #086c18;
      color: #fff
   }

`
