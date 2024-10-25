import React, { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth'; // Importar GoogleAuthProvider y signInWithPopup
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(''); // State to handle error messages
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setError(''); // Reset error state
    if (!email || !pass) {
      setError('Email and password are required'); // Handle empty input
      return;
    }
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate('/home');  // Redirect to a private page upon successful registration
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage); // Set the error message to display in the UI
      });
  };

  const handleGoogleSignUp = () => {
    const provider = new GoogleAuthProvider(); // Configurar el proveedor de Google
    signInWithPopup(auth, provider) // Autenticar con Google usando el popup
      .then((result) => {
        const user = result.user;
        console.log('Usuario autenticado con Google:', user);
        navigate('/usuario');  // Redirigir al usuario a una página protegida
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error en Google Sign-In:', errorCode, errorMessage);
        setError(errorMessage); // Mostrar el mensaje de error si ocurre
      });
  };

  const handleAppleSignUp = () => {
    const provider = new OAuthProvider('apple.com'); // Configurar el proveedor de Apple correctamente
    signInWithPopup(auth, provider) // Autenticar con Apple usando el popup
      .then((result) => {
        const user = result.user;
        console.log('Usuario autenticado con Apple:', user);
        navigate('/usuario');  // Redirigir al usuario a una página protegida
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error en Apple Sign-In:', errorCode, errorMessage);
        setError(errorMessage); // Mostrar el mensaje de error si ocurre
      });
  };

  return (
    <div>
      <div className="topnav">
        <h3 className="marca">GameGuard</h3>
        <button className="topButton2" onClick={() => navigate('/start')}>Return</button>
      </div>
      <div>
        <h2>Create Your Account</h2>
        <a>Sign up to start playing responsibly.</a>
      </div>
      <div className="auth-form-container">
        <form className="register-form" onSubmit={handleSignUp}> {/* Use form here */}
          <br/>
          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="email" 
            placeholder="youremail@gmail.com" 
            id="email" 
            name="email" 
          />
          <input 
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
            type="password" 
            placeholder="Password" 
            id="password" 
            name="password" 
          />
          <br/>
          <button type="submit">Sign Up</button>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        </form>
        <p>Or</p>
        
        {/* Botón de Google */}
        <button className="google-btn" onClick={handleGoogleSignUp}>
          <img 
            src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png" 
            alt="Google logo" 
            className="google-logo" 
          />
          Sign Up with Google
        </button>

        {/* Botón de Apple */}
        <button className="apple-btn" onClick={handleAppleSignUp}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
            alt="Apple logo"
            className="apple-logo"
          />
          Sign Up with Apple
        </button>

        
      </div>
    </div>
  );
};
