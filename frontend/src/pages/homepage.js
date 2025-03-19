import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Bienvenido a Granjoy</h1>
      <p>La plataforma que te ayuda a gestionar y planificar tu granja de manera eficiente.</p>
      <div style={{ margin: '20px 0' }}>
        <Link to="/login">
          <button style={{ margin: '10px', padding: '10px 20px' }}>Iniciar sesión</button>
        </Link>
        <Link to="/register">
          <button style={{ margin: '10px', padding: '10px 20px' }}>Registrarse</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;

