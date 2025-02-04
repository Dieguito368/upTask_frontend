import { ReactNode } from 'react';
import 'animate.css';

const Error = ({ children } : { children: ReactNode  }) => {
    return (
        <div className='bg-red-100 border-t-4 border-red-600 text-red-600 font-bold p-3 text-sm animate__animated animate__fadeIn mb-5'>
            { children }
        </div>
    )
}

export default Error;