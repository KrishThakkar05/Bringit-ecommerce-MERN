import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../app/features/authSlice";
import "./navbar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="navbar-horizontal-root">
      <nav className="main-navbar">
        <div
          className="navbar-flex-3col"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '70px',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 32px',
          }}
        >
          {/* Left: Logo/Brand */}
          <div className="navbar-logo" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <NavLink to="/" className="navbar-brand-link" style={{fontSize: '1.6rem', fontWeight: 700, color: '#223263', textDecoration: 'none'}}>
              <ion-icon name="bag-outline"></ion-icon>
              <span>Bringit</span>
            </NavLink>
          </div>
          {/* Center: Page Links */}
          <div className="navbar-center" style={{display: 'flex', alignItems: 'center', gap: '40px', flex: 1, justifyContent: 'center'}}>
            <NavLink to="/" className="nav-link" activeclassname="active" style={{fontSize: '1.15rem', fontWeight: 600, color: '#223263', textDecoration: 'none'}}>Home</NavLink>
            <NavLink to="/shop" className="nav-link" activeclassname="active" style={{fontSize: '1.15rem', fontWeight: 600, color: '#223263', textDecoration: 'none'}}>Shop</NavLink>
            <NavLink to="/cart" className="nav-link" activeclassname="active" style={{fontSize: '1.15rem', fontWeight: 600, color: '#223263', textDecoration: 'none'}}>Cart</NavLink>
          </div>
          {/* Right: User Greeting and Logout/Login */}
          <div className="navbar-user" style={{display: 'flex', alignItems: 'center', gap: '18px'}}>
            {userInfo ? (
              <>
                <span className="navbar-greeting" style={{fontSize: '1.08rem', fontWeight: 600, color: '#223263'}}>
                  Hello, {userInfo.name}
                </span>
                <button
                  className="navbar-logout"
                  style={{
                    background: '#223263',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 20px',
                    fontSize: '1.08rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className="nav-link" style={{fontSize: '1.08rem', fontWeight: 600, color: '#223263', textDecoration: 'none'}}>Login</NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
export default NavBar;
