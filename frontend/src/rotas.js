import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';

import Home from './components/Home/Home';
import SignUp from './components/Login/SignUp';
import Login from './components/Login/Login';
import Lotes from './components/Lotes/Lotes';
import PostLote from './components/Lotes/PostLote';

const Rotas = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/lotes" element={<Lotes />} />
				<Route path="/adicionar-lote" element={<PostLote />} />
			</Routes>
		</Router>
	);
};

export default Rotas;