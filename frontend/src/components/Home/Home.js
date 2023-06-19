import './style.css'
import React from 'react';
import Navbar from '../Navbar/Navbar';

const Home = () => {
	console.log(localStorage.getItem('username'))
	return (
		<div id="home">
			<Navbar />
			<div className='inicio'>
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
				<img src='https://img.freepik.com/fotos-gratis/uma-casa-azul-com-um-telhado-azul-e-um-fundo-do-ceu_1340-25953.jpg' alt='Casa' />
			</div>
			<div className='options'>
                <h4><a href="/lotes">Lotes</a></h4>
                <h4><a href="/casas">Casas</a></h4>
			</div>
		</div>
	);
};

export default Home;