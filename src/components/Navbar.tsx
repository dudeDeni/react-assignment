import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { User } from "../features/auth/authSlice";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import Logout from "../features/auth/Logout";

function TNavbar() {

  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  const [ userName, setUserName ] = useState('');

  const getEmailFragments = (data: User) => {
    const [name, domain] = data.email.split(/@(?=[^@]*$)/);
    return name
  };

  useEffect(() => {
    if (basicUserInfo) {
      const name = getEmailFragments(basicUserInfo);
      setUserName(name)
    }
  }, [basicUserInfo]);

  return (
    <Navbar sticky="top" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">News</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: { userName }
          </Navbar.Text>
          <Logout />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TNavbar;