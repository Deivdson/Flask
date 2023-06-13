import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';

import Home from './components/Home/Home.js';
import SignUp from './components/Login/SignUp.js';
import Login from './components/Login/Login.js';

const Rotas = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</Router>
	);
};

export default Rotas;