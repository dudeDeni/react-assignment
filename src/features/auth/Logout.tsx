import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { logout } from './authSlice';

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
        Like
      </Button>
    </div>
  );
}

export default Logout;