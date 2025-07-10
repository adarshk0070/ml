import React from 'react';

const Obstacle = ({ type, position }) => {
    const obstacleStyle = {
        position: 'absolute',
        left: position.x,
        bottom: position.y,
        width: '50px',
        height: '50px',
        backgroundImage: `url(/assets/${type}.png)`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
    };

    return <div style={obstacleStyle}></div>;
};

export default Obstacle;