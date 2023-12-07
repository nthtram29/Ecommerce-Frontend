import { Col, Row } from 'antd'
import React from 'react'
import { FacebookFilled, InstagramFilled,YoutubeFilled, MailFilled } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const FooterComponent = () => {
  return (
    <div style={{width: '100%', marginTop: '20px'}}>
    <div style={{width: '1100px', margin: '10px auto 50px', color: '#4d4d4d', borderTop: '1px solid #ccc', fontWeight: '350'}}>
        
        <Row>
            <Col span={8}>
                    <p style={{fontSize: '18px',fontWeight: 500}}> © 2023 Cửa hàng trang sức Di&Di</p>
                    <p> 9A Thạnh Xuân 13, P.Thạnh Xuân, Q.12, TP.Hồ Chí Minh</p>
                    <p> ĐT: 0284 123 567 - Fax: 028 3921 1702</p>
                    <p> Tổng đài hỗ trợ (08:00-21:00, miễn phí gọi)</p>
                    <p> Gọi mua: 1800545457 (phím 1)</p>
                    <p> Khiếu nại: 1800545457 (phím 2)</p>
            </Col>
            <Col span={4}>
                   <h3 style={{textDecoration: 'underline'}}> VỀ DI&DI</h3>
                   <p>Câu chuyện DI&DI</p>
                   <p>Tuyển dụng</p>
                   <p>Xuất khẩu</p>
                   <p>Kinh doanh sỉ</p>
                   <p>Kiểm định kim cương</p>
                   <p> Kinh doanh vàng miếng</p>

            </Col>
          
            <Col span={6}>
                    <h3 style={{textDecoration: 'underline'}}>KẾT NỐI VỚI CHÚNG TÔI</h3>
                    <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                    <FacebookFilled style={{fontSize: '40px', color: '#0f2ea5', marginRight: '10px'}}/>
                    <InstagramFilled style={{fontSize: '40px', color: '#cb603e', marginRight: '10px'}}/>
                    <YoutubeFilled style={{fontSize: '40px', color: '#ff002d', marginRight: '10px'}}/>
                    <MailFilled style={{fontSize: '40px', color: '#519fe5'}}/>
                    </div>
                    <div>
                        <h3 style={{textDecoration: 'underline'}}>QUAN TÂM QUA ZALO DI&DI</h3>
                        <p>Nhận các thông tin khuyến mãi hấp dẫn</p>
                        <ButtonComponent
                                size={40}
                                styleButton={{
                                    background: '#519fe5',
                                    height: '48px',
                                    width: '220px',
                                    border: 'none',
                                    borderRadius: '4px'
                                }}
                                
                                textButton={'Liên hệ qua ZALO DI&DI'}
                                styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonComponent>
                        
                    </div>
            </Col>
            <Col span={6}>
                    <h3 style={{textDecoration: 'underline', textAlign: 'center'}}>ĐĂNG KÝ NHẬN THÔNG TIN</h3>
                    {/* <p>Tại sao nên chọn bạc cao cấp?</p>
                    <p>Cách làm trắng bạc tại nhà</p>
                    <p>Phân biệt các loại bạc S925, S999,...</p>
                    <p>Những tác dụng của bạc</p>
                    <p>Cách bảo quản trang sức bạc</p> */}
                    <getresponse-form form-id="ae367448-138f-4ff9-b0e5-22761d96fcde" e="1"></getresponse-form>
            </Col>
        </Row>
    </div>
    </div>
  )
}

export default FooterComponent