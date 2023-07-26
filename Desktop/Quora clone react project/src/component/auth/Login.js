import React, { useState } from "react";
import "./Login.css";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../../firebase";
import { ArrowForwardIos } from "@mui/icons-material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

   const signIn = async () => {
     try {
       await signInWithPopup(auth, provider);
       console.log(auth.currentUser);
     } catch (e) {
       alert(e.message);
     }
   };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(auth);
    } catch (err) {
      alert(err);
    }
    setEmail("");
    setPassword("");
  };

  const registerSignIn = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth) {
        console.log(auth);
      }
    } catch (error) {
      alert(error.message);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png"
            alt=""
          />
        </div>
        <div className="login__desc">
          <p>A Place to Share knowledge and better understand the world</p>
    
        </div>
        <div className="login__auth">
          <div className="login__authOptions">
            <div className="login__authOption">
              <img
                className="login__googleAuth"
                src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
                alt=""
              />
              <p onClick={signIn}>Continue With Google</p>
            </div>
            <div className="login__authOption">
              <img
                className="login__googleAuth"
                src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png"
                alt=""
              />
              <span>Continue With Facebook</span>
            </div>
            <div className="login__authDesc">
              <p>
                {
                  showRegister ? (
                    (
                      <span onClick={() => setShowRegister(false)} style={{ color: "blue", cursor: "pointer" }}>
                        login  With Email
                      </span>
                    )
                  ) : (
                    <span onClick={() => setShowRegister(true)} style={{ color: "blue", cursor: "pointer" }}>
                      Sign Up With Email
                    </span>
                  )
                }
                
                . By continuing you indicate that you have read and agree to
                Quora's
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Terms of Service{" "}
                </span>
                and{" "}
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>
          <div className="login__emailPass">
            <div className="login__label">
              {
                showRegister ? <h4>Sign up</h4> : <h4>Login</h4>
              }
            </div>
            <div className="login__inputFields">
              <div className="login__inputField">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="login__inputField">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="login__forgButt">
              <small>Forgot Password?</small>
              {
                showRegister ? <button onClick={registerSignIn}>Sign up</button> : <button onClick={handleSignIn}>Login</button>
              }
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Login;
