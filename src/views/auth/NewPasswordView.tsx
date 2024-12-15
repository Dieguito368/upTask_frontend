import { useState } from 'react';
import NewPasswordForm from '@/components/auth/NewPasswordForm';
import NewPasswordToken from '@/components/auth/NewPasswordToken';
import { ConfirmToken } from '@/types/index';

const NewPasswordView = () => {
    const [ token, setToken ] = useState<ConfirmToken['token']>('');
    const [ isValidToken, setIsValidToken ] = useState(false);
    
    return (
        <>
            <h1 className="text-3xl font-black text-white text-center">Restablecer Cotraseña</h1>

            <p className="text-lg text-center mb-8 font-light text-white mt-5">
                { 
                    isValidToken
                    ? ( 
                        <>
                            Cambia tu contraseña para continuar gestionando proyectos y tareas de {''}
                            <span className=" text-fuchsia-500 font-bold">forma segura</span>
                        </>

                    ) : (
                        <>
                            Ingresa el código de 6 numeros que enviamos a tu {''}
                            <span className=" text-fuchsia-500 font-bold">correo electronico</span>
                        </>
                    )
                }
            </p>

            { 
                !isValidToken 
                    ? <NewPasswordToken token={ token } setToken={ setToken } setIsValidToken={ setIsValidToken } /> 
                    : <NewPasswordForm token={ token } /> 
                }
        </>
    );
}

export default NewPasswordView;