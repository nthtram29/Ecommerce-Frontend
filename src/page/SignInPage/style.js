import styled from "styled-components";
import backgroundImage from '../../assets/images/nha.png'

export const WrapperContainerLeft = styled.div`
    color: #fff;
    flex: 1;
    padding: 40px 45px 24px;
    display: flex;
    flex-direction: column
`
export const WrapperContainerRight = styled.div`
    width: 300px;
    background: linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    border-radius: 6px
`
export const WrapperTextLight = styled.span`
   color: #fff;
   font-weight: 700;
   font-size: 13px;
   cursor: pointer
`
export const WrapperSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: url(${ backgroundImage }) no-repeat;
  background-position: center;
  background-size: cover;
`
export const WrapperFormBox = styled.div`
  display: flex;
  height: 445px;
  width: 500px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-radius: 20px;
  backdrop-filter: blur(15px);

`