import { useAppDispatch } from "../../app/hooks";
import { logout } from './authSlice';

import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';

function Logout() {

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Button 
        onClick={() => handleLogout()}
      >
        <span>|</span>&nbsp;&nbsp;&nbsp;
        <span>Logout</span>
      </Button>
    </div>
  );
}

export default Logout;