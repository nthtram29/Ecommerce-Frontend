import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img{
        height: 300px;
        width: 200px;
    }
    position: relative;
    background-color: ${props => props.disabled ? '#ccc' : '#fff'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

    & .ant-card-bordered {
         border: 0px solid #f0f0f0; 
    }
`
export const StyleNameProduct = styled.div`
    font-weight: 500;
    margin-bottom:10px;
    font-size: 12px;
    line-height:16px;
    color: rgb(56, 56, 61);
`

export const WrapperReporText = styled.div`
font-size: 1em;
margin-bottom: 20px;
color: #2e1c11;
line-height: 20px;
`
export const WrapperPriceText = styled.div`
    font-weight: 500;
    color: rgb(255, 66, 78);
    font-size: 16px;
    margin: 6px 0 10px
`
export const WrapperDiscountText = styled.span`
    font-weight: 500;
    color: rgb(255, 66, 78);
    font-size: 12px
`

export const WapperContainer = styled.div`
    width: 340px;
    // padding: 10px;
    border: 1px solid #bfb3af;
    display: flex;
    justify-content: center;
    align-items: center;
`
