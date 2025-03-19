import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Bienvenido a Granjoy</h1>
      <Link to="/login">Iniciar sesión</Link>
      <br />
      <Link to="/register">Registrarse</Link>
    </div>
  );
}

export default HomePage;
