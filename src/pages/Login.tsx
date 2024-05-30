import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login } from "../features/auth/authSlice";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [apiToken, setToken] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    // This is only a basic validation of inputs. Improve this as needed.
    if (email && apiToken) {
      try {
        await dispatch(
          login({
            email,
            apiToken,
          })
        )
      } catch (e) {
        console.error(e);
      }
    } else {
      // Show an error message.
    }
  };

  return (
    <Container className='w-100 my-4 d-flex align-items-center justify-content-center pb-4'>
      <Form className="my-5" onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>API Token</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Token" 
            onChange={(e) => {
              setToken(e.target.value);
            }}
          />
        </Form.Group>
        <Button 
          variant="primary" 
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;