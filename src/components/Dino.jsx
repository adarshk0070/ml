import React from 'react';
import dinoImage from '../../public/assets/dino.png';
import './Dino.css';

const Dino = ({ position }) => {
    return (
        <img 
            src={dinoImage} 
            alt="Dino" 
            style={{
                position: 'absolute',
                bottom: position.y,
                left: position.x,
                width: '50px',
                height: '50px'
            }} 
        />
    );
};

export default Dino;