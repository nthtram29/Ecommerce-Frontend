import styled from "styled-components";
import ButtonComponent from "../../Component/ButtonComponent/ButtonComponent";


export const WrapperTypeProduct = styled.div`
     display: flex;
     align-items: center;
     gap: 24px;
     justify-content: flex-start;
     
     height: 44px;
`
export const WrapperButtonMore = styled(ButtonComponent)`
     &:hover{
          color: #fff;
          background: rgb(77, 77, 77);
          span{
               color: #fff
          }
     }
     width: 100%;
     text-align: center;
     cursor: ${(props)=> props.disabled ? 'not-allowed' : 'pointers'}

`
export const WrapperProducts = styled.div`
    display: flex;
    gap: 25px;
    margin-top: 25px;
    flex-wrap: wrap;
    
`
export const WrapperTittle = styled.h2`
     text-align: center;
     margin: 40px 400px;
     border-bottom: 2px solid #ccc;
     padding: 0 0 10px;
     font-weight: 500;
`
export const WrapperBox = styled.div`
     margin: 0 10px 0 0;
     padding: 15px;
     border: 1px solid #ccc;
     border-radius: 10px;
     text-align: center;
`
export const WrapperBoxEnd = styled.div`
     margin: 0;
     padding: 15px;
     border: 1px solid #ccc;
     border-radius: 10px;
     text-align: center;
`