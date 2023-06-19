import React from 'react';

const MainIcon = () => {
    return (
        <div
            className="bg-black flex font-bold items-center justify-center rounded-full text-red-700 text-3xl"
            style={{ width: '3rem', height: '3rem'}}
            data-testid="icon-container-div"
        >
            M
        </div>
    );
};

export default MainIcon;