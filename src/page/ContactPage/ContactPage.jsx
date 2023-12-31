import React from 'react'
import NavbarComponent from '../../Component/NavbarComponent/NavbarComponent'
import { WrapperCB, WrapperContainer, WrapperStyleDescription, WrapperSubmit, WrapperTittle, Wrappercb1, Wrappercb2, Wrapperfname, Wrappermessage } from './style'
import Iframe from 'react-iframe'
import { Col, Form, Image, Row } from 'antd'
import imgContact from '../../assets/images/ImgContact.png'
import imgContact2 from '../../assets/images/ImgContact2.jpg'
import imgContact3 from '../../assets/images/ImgContact4.png'
import InputComponent from '../../Component/InputComponent/InputComponent'
import ButtonComponent from '../../Component/ButtonComponent/ButtonComponent'
import Helmet from '../../Component/Helmet/Helmet'



const ContactPage = () => {
    const [form] = Form.useForm();
  return (
    <>
    <Helmet title={"Liên hệ"}/>
    <NavbarComponent />
    <div className='body' style={{background: `rgb(255,253,255)`, background: `linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 98%, rgba(247,244,244,1) 99%, rgba(217,201,201,1) 100%)`}}>
    <div id='container' style={{width: '1100px', margin: '0 auto',  height: '100%', paddingTop: '6px'}}>
    <WrapperTittle>THÔNG TIN LIÊN HỆ</WrapperTittle>
          
          <div>
            <p>
                
            </p>
          </div>
          <Row>
          
          <Col span={12}>
          <Image src={imgContact} preview={false} alt='image-logo' width='100%' />
          </Col>
          <Col span={12} style={{paddingLeft: '30px'}}>
                <WrapperStyleDescription>Ra đời vào năm 2023, Di&Di-Jewelry hướng đến mục tiêu đem lại những sự lựa chọn trang sức lý tưởng. 
                Thấu hiểu người trẻ luôn hướng đến gu thẩm mỹ cao, tìm kiếm cảm hứng mới mẻ, mong muốn sáng tạo món trang sức của riêng mình, 
                chúng tôi theo đuổi mô hình thiết kế và chế tác "Bespoke" cùng những dịch vụ khác biệt để việc mua sắm trở thành niềm vui thích, trải nghiệm đặc sắc.    
                </WrapperStyleDescription>
                <WrapperStyleDescription>
                Mỗi thiết kế của chúng tôi ẩn chứa câu chuyện của đam mê mang theo tâm huyết của những nghệ nhân, sự chính xác trong chế tác, 
                tinh tuyển kim cương & đá quý, tất cả tạo nên sự thoải mái, cảm xúc và phong thái tự tin sang trọng cho chủ sở hữu. 
                Đó là cách chúng tôi tô điểm cho vẻ đẹp và tình yêu của những người trẻ hiện đại thêm tươi đẹp, đầy sắc màu.
                </WrapperStyleDescription>
          </Col>
          </Row>

          <Row>
          
          
          <Col span={12} style={{padding: '10px 0 0 20px'}}>
                <WrapperStyleDescription>
                    <p>Di&Di-Jewelry tự hào là :</p>
                    <p> ✔️Thương hiệu đã được đăng kí bởi cục sở hữu trí tuệ và được bảo hộ bởi pháp luật Việt Nam</p>

                   <p> ✔️HOÀN TIỀN GẤP 5 LẦN nếu bạc không đủ tiêu chuẩn 925, hỗ trợ khách kiểm định (tính phí)</p>

                   <p> ✔️Chất lượng được chứng minh bởi hàng trăm khách hàng trong thời gian qua!</p>

                   <p>✔️Hãy chọn cho mình 1 thương hiệu trang sức bạc 925 uy tín và lâu đời để luôn chắc rằng trang sức của bạn được bảo hành trắng sáng MIỄN PHÍ VĨNH VIỄN.
                    </p>
                </WrapperStyleDescription>
               
          </Col>
          <Col span={12} style={{paddingLeft: '30px', marginTop: '-50px'}}>
          <Image src={imgContact2} preview={false} alt='image-logo' width='100%' />
          </Col>
          </Row>

          
          <Row  style={{margin: '20px 0'}}>
          
          <Col span={14}>
            <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2988716362097!2d106.66222417377611!3d10.864857557558889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529230908281b%3A0xd219695c5b1fb82e!2zOUEgVGjhuqFuaCBYdcOibiAxMywgVGjhuqFuaCBYdcOibiwgUXXhuq1uIDEyLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmggNzAwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1701583183338!5m2!1svi!2s" 
                // position="absolute"
                width="100%"
                id="myId"
                className="myClassname"
                height="450"
                allowfullscreen=""
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                styles={{border: "0"}}/>
          </Col>
          <Col span={10} style={{padding: '0 0 0 20px'}}>
          <WrapperStyleDescription>
                    <p style={{fontSize: '18px',fontWeight: 500, textDecoration: 'underline'}}> Trải nghiệm cửa hàng</p>
                    <p> Trải nghiệm ngay không gian thoải mái, riêng tư và khác biệt tại cửa hàng của chúng tôi. Đội ngũ tư vấn viên tận tình chuyên nghiệp sẽ đồng hành và mang lại cho Quý khách hàng trải nghiệm mua sắm thư thái và an tâm tuyệt đối.</p>
                    <p> Giờ làm việc:8:30 - 20:30 (bao gồm Chủ Nhật) </p>
                    <p> Địa chỉ: 9A Thạnh Xuân 13, P.Thạnh Xuân, Q.12, TP.Hồ Chí Minh</p>
                    <p> ĐT: 0284 123 567 - Fax: 028 3921 1702</p>
                    <p> Tổng đài hỗ trợ (08:00-21:00, miễn phí gọi)</p>
                    <p> Gọi mua: 1800545457 (phím 1)</p>
                    <p> Khiếu nại: 1800545457 (phím 2)</p>
            </WrapperStyleDescription>
          </Col>
          </Row>
          <p style={{fontSize: '18px',fontWeight: 500, textDecoration: 'underline', textAlign: 'center'}}> Một số hình ảnh tại cửa hàng</p>
          <Image src={imgContact3} preview={false} alt='image-logo' width='100%' />

          <div style={{textAlign: 'center', width: '600px', margin: '0 auto'}}>
            <p style={{fontSize: '18px',fontWeight: 500, textDecoration: 'underline', textAlign: 'center'}}>Liên hệ với chúng tôi</p>
            
         
                             {/* <getresponse-form form-id="ac29cb7e-ebde-499d-94ad-84dc8ff157ca" e="1"></getresponse-form> */}
                             <getresponse-form form-id="05a2beda-2c7a-4a2d-9337-e6d00bd32b87" e="1"></getresponse-form>
         </div>
         
 </div>
</div>
 
 </>
  )
}

export default ContactPage