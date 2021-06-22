import React from 'react';
import Logo from './imgs/Netflix_Logo_RGB.png'
import './Header.css';

export default({black}) => {
return (
    <header className={black ? 'header--black':''}>
        <div className='header--logo'>
            <a href='/'>
                <img src ={Logo} alt='Netflix Logo'></img>
            </a>
        </div>
       <div className='header--user'>
       <a href='/'>
                <img src ='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='Imagem do Usuário'></img>
            </a>
        </div> 
    </header>
);
}