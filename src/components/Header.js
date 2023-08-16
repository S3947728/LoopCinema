import React, { useState } from "react"
import logo from '../movie.png'
import SignUpModal from "../modals/SignUpModal";
import SignInModal from "../modals/SignInModal";
import App from '../App'
import { Link } from "react-router-dom";

function Header(props) {
  const [signUpModalOn, setSignUpModalOn] = useState(false);
  const [signInModalOn, setSignInModalOn] = useState(false);
  const [signInUser, setSignInUser] = useState(App.getUser);
  
  return (
    <>
      <SignUpModal 
        show={signUpModalOn}
        onHide={ ()=> setSignUpModalOn(false)}
         
      />
      <SignInModal
        show={signInModalOn}
        onHide={ () => setSignInModalOn(false)}
        loginUser={signInUser}
      />

      {/* show prop allows user to see the modal */}
      {/* onHide is to hide the modal */}

        
      <ul className="webHeader">
        <img src={logo} alt="logo" class="mainLogo"></img>
        <h1 id="brandName">Loop Cinemas</h1>
        {props.username === null ? //if username doesn't exsit shwoing SignIn/Out
          <>
            <li className="header-item">
              <button type="button" className='signUp_button' onClick={ ()=> setSignUpModalOn(true)}>
                Sign Up
              </button>
              
            </li >
            <li className="header-item">
              <Link to="/modals/SignInModal">
                <button type="button" className='signIn_button' onClick={ ()=> setSignInModalOn(true)}> 
                  Sign In
                </button>
              </Link>
              {/* <Link className="header-link" to="/modals/SignInModal" /> */}
            </li>
          </>  
          :
          // if the user exsits showing wlecome message
          <> 
            <li className="header-item">
              <span className="nav-link text-light">Welcome, {props.username}</span>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={props.logoutUser}>Logout</Link>
            </li> */}
            <button type="button" className='signOut_button' onClick={ props.logoutUser}> 
              Sign Out
            </button>
          </>
        }
      </ul>
    </>
  );
};

export default Header;
