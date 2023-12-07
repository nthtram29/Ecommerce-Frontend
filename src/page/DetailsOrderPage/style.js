import styled from "styled-components"

export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const WrapperInfoUser = styled.div`
  box-shadow: 0 12px 12px #ccc;
  .name-info {
    font-size: 13px;
    color: rgb(36, 36, 36);
    font-weight: bold;
    
    padding: 0 0 10px;
  }
  .address,.phone-info,.delivery-info,.delivery-fee,.payment-info {
    color: rgba(0, 0, 0, 0.65);
    font-size: 13px;
    margin-top: 8px;
  }
  .name-delivery {
    color: rgb(234, 133, 0); 
    font-weight: bold;
    text-transform: uppercase;
  }
  .status-payment {
    margin-top: 8px;
    color: rgb(234, 133, 0); 
  }
`

export const WrapperLabel = styled.div`
  color: rgb(36, 36, 36);
  font-size: 13px;
  text-transform: uppercase;
  margin-bottom: 15px;
  text-decoration: underline
`
export const WrapperContentInfo = styled.div`
  height: 118px;
  width: 320px;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
`

export const WrapperStyleContent = styled.div`
  display:flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 40px;
  
`

export const WrapperProduct = styled.div`
  display:flex;
  align-items:flex-start;
  margin-top: 10px;
  box-shadow: 0 8px 8px #ccc;
`

export const WrapperNameProduct = styled.div`
  display:flex;
  align-items: flex-start;
  width: 670px;
`

export const WrapperItem = styled.div`
  width: 200px;
  font-weight: bold;
  &:last-child {
    color: red
  }
`
export const WrapperItemLabel = styled.div`
  width: 200px;
  
`
export const WrapperItemPrice = styled.div`
  font-weight: bold;
   color: red;
`


export const WrapperAllPrice = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`