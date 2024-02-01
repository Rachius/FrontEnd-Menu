import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContex';

function LogoutButton() {
  const { logOut } = useAuth();
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    await logOut();
    setLogoutSuccess(true);
  };

  useEffect(() => {
    if (logoutSuccess) {
      navigate("/logoutscr");
    }
  }, [logoutSuccess, navigate]);

  return (
    <div>
      <li className="nav-item">
        <Link to="/logoutscr" className="nav-link" onClick={handleLogout}>
          LogOut
        </Link>
      </li>
    </div>
  );
}

export default LogoutButton;
