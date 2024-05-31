import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login } from "../features/auth/authSlice";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Placeholder from 'react-bootstrap/Placeholder';
import Form from 'react-bootstrap/Form';

function Login() {

  const dispatch = useAppDispatch();

  const hasError = useAppSelector((state) => state.auth.error)
  const isLoading = useAppSelector((state) => state.auth.status)

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
      <Form className="my-5 w-50" onSubmit={handleLogin}>
        <Form.Label className="display-6">Register for API key</Form.Label>
        <Form.Label className=""><span>1. </span>Click on the link <a href="https://newsapi.org/register" target="_blank">https://newsapi.org/register</a> to visit the registration page.</Form.Label>
        <Form.Label className=""><span>2. </span>Fill out the registration form with the required information to create an account.</Form.Label>
        <Form.Label className=""><span>3. </span>Once you have successfully registered, you will receive an API key.</Form.Label>
        <Form.Label className=""><span>4. </span>Copy the API key provided to you.</Form.Label>
        <Form.Label className=""><span>5. </span>Use this API key to authenticate and access the News API.</Form.Label>
        <Form.Group className="my-3" controlId="formGroupEmail">
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
        
        {isLoading !== "idle" ? (
          <Placeholder.Button variant="primary" xs={12} />
        ) : (
          <Button 
            variant="primary" 
            type="submit"
          >
            Submit
          </Button>
        )}
      <span className="text-danger" >{hasError}</span>
      </Form>
    </Container>
  );
}

export default Login;