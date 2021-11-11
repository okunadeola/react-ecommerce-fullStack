import {useEffect, useState} from 'react'
import { Add, Remove } from '@material-ui/icons'
import styled from 'styled-components'
import StripeCheckout from 'react-stripe-checkout'


import Announcement from '../Components/Announcement'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { mobile } from '../responsive'
import { useHistory} from 'react-router'
import { useSelector } from 'react-redux'
import { userRequest } from '../requestMethod'

// const KEY = ""  stripe public key

const Container = styled.div`

`
const Wrapper = styled.div`
padding: 20px;
${mobile({
  paddiing: '10px'
})}
`
const Title = styled.h1`
font-weight: 300;
text-align: center;
`
const Top = styled.div`
  display:flex;
  align-items: center;
  justify-content:space-between;
  padding: 20px;
  ${mobile({
    padding: '0px'
  })}
`

const TopBotton = styled.button`
 padding: 10px;
 cursor:pointer;
 border: ${props=> props.type === 'filled' && 'none'};
 background-color: ${props=> props.type === 'filled' ?'black' : 'transparent'};
 color: ${props=> props.type === 'filled' && 'white'};
`
const TopTexts = styled.div`
${mobile({
  display: 'none'
})}
`

const TopText = styled.span`
  text-decoration:underline;
  cursor:pointer;
  margin: 0px 10px;


`

const Bottom = styled.div`
display:flex;
justify-content : space-between;
${mobile({
  flexDirection: 'column'
})}
`
const Info = styled.div`
flex:3;

`



const Product = styled.div`
 display: flex;
 justify-content: space-between;
 ${mobile({
  flexDirection: 'column'
})}
`
const ProductDetails = styled.div`
   flex: 2;
   display: flex;
   padding: 10px 0;
`
const Image = styled.img`
width: 200px;
height: 150px;
object-fit:cover;
`
const Detail = styled.div`
 padding: 20px;
 display: flex;
 flex-direction: column;
 justify-content: space-around;
`
const ProductName = styled.div`

`
const ProductId = styled.span`

`
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props=>props.color}
`
const ProductSize = styled.span`

`
const PriceDetails = styled.div`
  flex : 1;
  display: flex;
  align-items: center;
  flex-direction:column;
  justify-content: center;
`
const ProductAmountContainer = styled.div`
display: flex;
align-items: center;
margin-bottom: 20px;
`
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({
    margin: '5px 15px'
  })}
`
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({
    marginBottom: '20px'
  })}
`
const Hr = styled.hr`
  background-color: #eee;
  height: 1px;
  border: none;
 
`
const Summary= styled.div`
flex :1;
border: 0.5px solid lightgrey;
border-radius:10px;
padding: 20px;
height: 50vh;

`
const SummaryTitle = styled.h1`
  font-weight: 200;
`
const SummaryItem= styled.div`
margin: 30px 0;
display: flex;
justify-content: space-between;
font-weight:${props=> props.type=== "total" && "500"};
font-size:${props=> props.type=== "total" && "24px"};
`
const SummaryItemText = styled.span`
color:${props=> props.type };
`
const SummaryItemPrice = styled.span``
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  border: none;
  cursor:pointer;
`

const Cart = () => {

  const cart = useSelector(state=> state.cart)
  const [stripeToken, setStripeToken]= useState(null)
  const history = useHistory()

  const onToken = (token)=>{
    setStripeToken(token)
    console.log(token);
  }

  useEffect(() => {
    const makeRequest = async()=>{
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total *100,
        })
        history.push("/success", {
          stripeData: res.data,
          products: cart, });
      } catch (error) {
        console.log(error);
      }
    }
    stripeToken && cart.total >= 1 && makeRequest();
  }, [stripeToken, cart.total, history])

  return (
    <Container>
      <Navbar/>
      <Announcement/>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopBotton>CONTINUE SHOPPING</TopBotton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopBotton type='filled'>CHECKOUT NOW</TopBotton>
          
          </Top>
        <Bottom>
          <Info>
            {/* products */}
            { cart.products.map(product=>(
            <Product key={product._id}>
              <ProductDetails>
                <Image src={product.img}/>
                <Detail>
                  <ProductName><b>Product:</b>{product.title}</ProductName>
                  <ProductId><b>ID:</b>{product._id}</ProductId>
                  <ProductColor color={product.color}/>
                  <ProductSize><b>Size:</b>{product.size}</ProductSize>
                </Detail>
              </ProductDetails>
              <PriceDetails>
                <ProductAmountContainer>
                  <Add/>
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <Remove/>
                </ProductAmountContainer>
                <ProductPrice>$ {product.price *product.quantity} </ProductPrice>
              </PriceDetails>
            </Product>     
              )) 
            }
            {/* prod end */}
            <Hr/>
      
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$-5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText >Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>

            {stripeToken ? (<span>Processing. Please wait</span>) :
              <StripeCheckout 
                name="Ola Shop"
                image='https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNoaXJ0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'
                billingAddress
                shippingAddress
                description = {`Your total is ${cart.total}`}
                amount={cart.total*100}
                token={onToken}
                stripeKey={KEY}
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            }
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer style={{backgroundColor: "grey"}}/>
    </Container>
  )
}

export default Cart
