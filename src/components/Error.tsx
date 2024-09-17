import { ReactNode } from 'react';

const Error = ({ children } : { children: ReactNode  }) => {
    return (
        <div className='text-center bg-red-100 border-t-4 border-red-600 text-red-600 font-bold p-3 uppercase text-sm'>
            { children }
        </div>
    )
}

export default Error;