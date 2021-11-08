import React, { useRef, useState } from 'react';
import "./register.scss";

function Register() {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () => {
        setEmail(emailRef.current.value);
    }

    const handleFinish = () => {
        setPassword(passwordRef.current.value);
    }

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                    />
                    <button className="loginButton">Sign In</button>
                </div>
            </div>
            <div className="container">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>
                Ready to watch? Enter your email to create or restart your membership.
                </p>
                {email ? (
                    <div className="input">
                        <input type="email" placeholder="Enter your Email" ref={emailRef} />
                        <button className="registerButton" onClick={() => handleClick()}>Get Start</button>
                    </div> 
                ) : (
                    <div className="input">
                        <input type="password" placeholder="Enter your Password" ref={passwordRef} />
                        <button className="registerButton" onClick={() => handleFinish()}>Start</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Register;
