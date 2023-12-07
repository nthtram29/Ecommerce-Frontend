import styled from "styled-components"
import ButtonComponent from "../ButtonComponent/ButtonComponent"

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