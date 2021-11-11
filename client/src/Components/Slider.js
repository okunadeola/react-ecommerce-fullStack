import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons"
import { useState } from "react"
import { useHistory } from "react-router"
import styled from "styled-components"
import { sliderItems } from "../data"
import { mobile } from "../responsive"


const Container = styled.div`
  width : 100%;
  height : 100vh;
  display : flex;
  position: relative;
  overflow: hidden;
  ${mobile({
    display: 'none'
  })}
`

const Arrow = styled.div`
  width : 50px;
  height : 50px;
  background-color:  #fff7f7;
  border-radius : 50%;
  display: flex; align-items: center; justify-content: center;
  position: absolute;
  top : 0;
  bottom : 0;
  left: ${props => props.direction === 'left' && '10px'};
  right: ${props => props.direction === 'right' && '10px'};
  cursor : pointer;
  margin : auto;
  opacity: 0.5;
  z-index : 2
`

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
display : flex;
  align-items : center;
  background-color : #${props => props.bg}
`
const ImgContainer = styled.div`
  height : 100%;
  flex : 1;
`
const Title = styled.h1`
  font-size : 70px
`
const Description = styled.p`
  margin : 50px 0px;
  font-size: 20px;
  font-weight : 50;
  letter-spacing : 3px
`
const Button = styled.button`
  padding : 10px;
  font-size : 20px;
  background-color : transparent;
  cursor : pointer
`

const Image = styled.img`
  height : 100%;
  width: 100%;
  object-fit:cover;
`

const InfoContainer = styled.div`
  flex : 1;
  padding : 50px;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1s ease;
  transform : translateX(${(props) => props.sliderIndex * -100}vw);
`

const Slider = () => {
  const [sliderIndex, setSliderIndex] = useState(0)
  const history = useHistory()

  const Shop = () => {
    history.push('/products')
  }

  const handleClick = (direction) => {
    if (direction === "left") {
      setSliderIndex(sliderIndex > 0 ? sliderIndex - 1 : 2)
    } else {
      setSliderIndex(sliderIndex < 2 ? sliderIndex + 1 : 0)
    }
  }



  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper sliderIndex={sliderIndex}>
        {sliderItems.map(item => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>

            <InfoContainer>
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
              <Button onClick={Shop}>SHOP NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  )
}

export default Slider
