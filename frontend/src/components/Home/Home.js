import './style.css'
import React from 'react';
import Navbar from '../Navbar/Navbar';

const Home = () => {

	return (
		<div id="home">
			<Navbar />
			<div className='inicio'>
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
				<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ83rXPj8itnlvgigYEfa___Ci5Ml7UQG2BHg&usqp=CAU' />
			</div>
		</div>
	);
};

export default Home;