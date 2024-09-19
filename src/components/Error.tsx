import { ReactNode } from 'react';
import 'animate.css';

const Error = ({ children } : { children: ReactNode  }) => {
    return (
        <div className='bg-red-100 border-l-4 border-red-600 text-red-600 font-bold p-3 text-sm mb-5 animate__animated animate__fadeIn'>
            { children }
        </div>
    )
}

export default Error;