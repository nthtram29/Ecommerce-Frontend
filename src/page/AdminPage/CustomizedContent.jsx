import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined,BookOutlined } from '@ant-design/icons'


const CustomizedContent = (props) => {
  const {data } = props
  return (
    
    <div style={{display: 'flex', gap: '20px', justifyContent: 'center'}}>
      {Object.keys(data) && Object.keys(data)?.map((item) => {
        return (
          <div 
          key={Math.random()} 
          style={{
            width: 250,
            background:'#fff5ac', 
            height: 100, 
            display: 'flex', 
            gap: 20, 
            justifyContent: 'center', 
            alignItems: 'center',
            borderRadius: '10px',
            border: '1px solid #ccc'
          }}
           
          >
            <span style={{color: 'black',fontSize: 20,}}>
              {item === 'users' && <UserOutlined />}
              {item === 'products' && <AppstoreOutlined />}
              {item === 'orders' && <ShoppingCartOutlined />}
              {item === 'postss' && <BookOutlined />}   
            </span>
            <span style={{color: 'black',fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase'}}>{item}</span>
            <span style={{color: 'black',fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase'}}>{data[item]}</span>
          </div>
        )
      })}
    </div>
    
  );
};

export default CustomizedContent;