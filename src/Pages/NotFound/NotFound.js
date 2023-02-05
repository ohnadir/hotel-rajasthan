import React from 'react';
import error from '../../assets/NotFound.gif';

const NotFound = () => {
    return (
        <div>
           <img src={error} alt="404" />
        </div>
    );
};

export default NotFound;