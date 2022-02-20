import styled from "styled-components";
import { mobile } from "../responsive";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { userUrl } from "../requestMethod";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-right:20px;
  margin-bottom:20px
`;
const Error = styled.span`
color:red
`;


const Register = () => {
  const history = useHistory();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef()
  const [errorMessage, setErrorMessgae] = useState('')
  const [allready, setAllready] = useState('')


  const register = async (e) => {
    e.preventDefault()
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        confirmPassword: confirmPassword.current.value
      };
      try {
        await userUrl.post("auth/register", user)
          .then(e => history.push('/login'))
          .catch(err => {
            setAllready(JSON.stringify(err?.response?.data?.keyValue));
            return setErrorMessgae(err?.response?.data?.details[0]?.message)
          })


      } catch (err) {
        console.log(err)

      }
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Error>  {errorMessage} </Error>
        <Error>  {allready ? allready.replace("{", "").replace("}", "") + 'has been allready' : ''} </Error>
        <Form>
          <Input type="text"  ref={username} placeholder="username" />
          <Input type="email" ref={email} placeholder="email" />
          <Input type="password" ref={password} placeholder="password" />
          <Input type="password" ref={confirmPassword} placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit" onClick={register}>CREATE</Button>
          <Button onClick={(e) => { e.preventDefault(); return window.location.replace('/login') }}>Login</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
