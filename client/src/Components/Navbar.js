import React from 'react'
import styled from 'styled-components'
import { Search } from '@material-ui/icons'
import { ShoppingCartOutlined } from '@material-ui/icons'
import { Badge, } from '@material-ui/core'
import { mobile } from '../responsive'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loggedOut } from '../redux/apiCalls'



const Container = styled.div`
  height : 60px;
  ${mobile({
  height: '50px'
})}
`
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content : space-between;
  align-items: center;
  ${mobile({
  padding: '10px 0px'
})}
`
const Left = styled.div`
flex : 1;
cursor : pointer;
display : flex;
align-items : center;
`
const SearchContainer = styled.div`
  border : 0.5px solid lightgray;
  display : flex;
  align-items : center;
  margin-left : 25px;
  padding: 5px;
`

const Input = styled.input`
  border: none;
  ${mobile({
  width: '50px'
})}
`

const Language = styled.span`
  font-size : 14px;
  ${mobile({
  display: 'none'
})}
`


const Logo = styled.h1`
  font-weight : bold;
  ${mobile({
  fontSize: '24px'
})}
`
const Center = styled.div`
flex : 1;
text-align : center;
cursor:pointer;
`
const Right = styled.div`
flex : 1;
display : flex;
align-items : center;
justify-content : flex-end;
${mobile({
  justifyContent: 'center',
  flex: 2
})}

`

const MenuItem = styled.div`
  font-size : 14;
  margin-left : 25px;
  cursor : pointer;
  ${mobile({
  fontSize: '12px',
  marginLeft: '10px'
})}
`



const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity);
  const user = useSelector(state => state.user.currentUser)


  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogout= ()=>{
    loggedOut(dispatch, history)
  }


  const Register = () => {
    history.push('/Register')
  }
  const Login = () => {
    history.push('/Login')
  }
  const Home = () => {
    history.push('/')
  }
  const Cart = () => {
    history.push('/cart')
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="search" />
            <Search style={{ color: 'gray', fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center onClick={Home}><Logo>LDEV.</Logo></Center>
        <Right>
          {user ? (
            <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
          )
            : (
              <>
                <MenuItem onClick={Register}>REGISTER</MenuItem>
                <MenuItem onClick={Login}>LOGIN</MenuItem>
              </>
            )
          }
          <Link to="/cart">
            <MenuItem onClick={Cart}>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>


    </Container>
  )
}

export default Navbar
