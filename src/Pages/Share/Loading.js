import React from 'react';
import { HashLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className='grid w-10 mx-auto h-screen content-center'>
            <div>
                <HashLoader
                    color="#ff8080"
                    cssOverride={{}}
                    size={60}
                    speedMultiplier={1}
                />
            </div>
        </div>
    );
};

export default Loading;