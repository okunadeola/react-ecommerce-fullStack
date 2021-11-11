import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
// import { sendEmail } from '../redux/apiCalls'
import { mobile } from '../responsive'
import Image from "../work4.jpg"

const Container = styled.div`
width: 100wh;
height: 100vh;
background:linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.2)), url(${Image}) no-repeat center/cover;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
`
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color:white;
  ${mobile({
  width: '75%'
})}
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin:10px 0;
  padding: 10px
`
const Button = styled.button`
  width:40%;
  border: none;
  padding:15px 20px;
  background-color:teal;
  color:white;
  cursor:pointer;
  margin-bottom: 10px;
  &:disabled{
    color: green;
    cursor: not-allowed
  }
`
const Link = styled.a`
margin:5px 0px;
font-size: 12px;
text-decoration: underline;
cursor:pointer;
`

const Error = styled.span`
color: red;
`


const ForgotPassword = () => {

  const [email, setEmail] = useState("")
  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault()
    // sendEmail(dispatch, { email })
  }
  return (
    <Container>
      <Wrapper>
        <Title>FORGOT PASSWORD</Title>
        <Form>
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <Button onClick={handleClick}>SUBMIT EMAIL</Button>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default ForgotPassword
