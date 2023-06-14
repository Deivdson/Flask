import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';

import Home from './components/Home/Home';
import SignUp from './components/Login/SignUp';
import Login from './components/Login/Login';

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