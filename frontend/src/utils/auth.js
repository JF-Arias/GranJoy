// LoginPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/perfil', { replace: true }); // Evita regresar con "atrás"
        }
    }, []);

    // tu código de login...
};
