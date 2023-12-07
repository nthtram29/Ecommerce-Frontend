import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import FooterComponent from '../FooterComponent/FooterComponent'

const DefautComponent = ({children}) => {
  return (
    <>
    <HeaderComponent />
    {children}
    <FooterComponent />
    </>
  )
}

export default DefautComponent