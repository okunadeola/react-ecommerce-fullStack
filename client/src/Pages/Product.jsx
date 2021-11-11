import { Add, Remove } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import styled from 'styled-components'
import Announcement from '../Components/Announcement'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { addProduct } from '../redux/cartRedux'
import { publicRequest } from '../requestMethod'
import { mobile } from '../responsive'

const Container = styled.div`

`
const Wrapper = styled.div`
padding: 50px;
display: flex;
${mobile({
  padding: '10px',
  flexDirection: 'column'
})}
`
const ImgContainer = styled.div`
 flex:1;
`
const Image = styled.img`
width:100%;
height: 90vh;
object-fit: cover;
${mobile({
  height: '40vh'
})}
`
const InfoContainer = styled.div`
flex:1;
padding: 0px 50px;
${mobile({
  padding: '10px'
})}
`
const Title = styled.h1`
 font-weight: 200;
`
const Desc = styled.p`
  margin:20px 0px;
`
const Price = styled.span`
  font-weight: 100;
  font-size:40px;
`
const FilterContainer = styled.div`
  width: 50%;
  display: flex;
  margin: 30px 0px;
  justify-content:space-between;
  ${mobile({
    width: '100%'
  })}
`
const Filter = styled.div`
  display: flex;
  align-items: center;
`
const FilterTitle = styled.div`
  font-size: 20px;
  font-weight: 200;

`
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(params)=> params.color};
  margin: 0px 5px;
  cursor:pointer;
`
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px
`
const FilterSizeOption = styled.option``

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({
    width: '100%'
  })}
`
const AmmountContainer= styled.div`
display: flex;
align-items: center;
font-weight: 700;
`
const Amount = styled.span`
  width:30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;

`
const Button = styled.button`
  padding: 15px;
  border: 1px solid teal;
  cursor:pointer;
  background-color: white;
  font-weight: 500;

  &:hover{
    background-color:#f8f4f4;
  }
`



const Product = () => {

  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct]= useState({});
  const [quantity, setQuantity]= useState(1);
  const [color, setColor]= useState("");
  const [size, setSize]= useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    const getProduct= async ()=>{
    try {
        const res = await publicRequest.get('/product/find/'+id)
        setProduct(res.data)
      }catch (error) {
        console.log(error);
      }
    } 
    getProduct()

  }, [id])

  const handleQuantity = (type)=>{
    if(type === "dec") return quantity > 1 && setQuantity(quantity -1)
    setQuantity(quantity + 1)
  }


  const history = useHistory()

  const addToCart = () => {
    dispatch(addProduct({...product, quantity, size, color}))
  }
  return (
    <Container>
      <Navbar/>
      <Announcement/>
        <Wrapper>
          <ImgContainer>
            <Image src={product.img}/>
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price>{`$ ${product.price}`}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {product && product.color?.map((c)=>( 
                  <FilterColor color={c} key={c} onClick={()=>setColor(c)}/>
                ))}
              </Filter>

              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize onChange={(e)=>setSize(e.target.value)}>
                {product && product.size?.map((c)=>( 
                  <FilterSizeOption key={c}>{c}</FilterSizeOption>
                ))}
                </FilterSize>
                
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmmountContainer>
                <Remove onClick={()=>handleQuantity("dec")}/>
                <Amount>{quantity}</Amount>
                <Add onClick={()=>handleQuantity("inc")}/>
              </AmmountContainer>
              <Button onClick={addToCart}>Add To Cart</Button>
            </AddContainer>
          </InfoContainer>

        </Wrapper>
      
      <Footer/>
    </Container>
  )
}

export default Product
