import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp';
import Lotes from './components/Lotes/Lotes';
import PostLote from './components/Lotes/PostLote';
import Casas from './components/Casas/Casas';
import PostCasa from './components/Casas/PostCasas';

const Rotas = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/lotes" element={<Lotes />} />
				<Route path="/adicionar-lote" element={<PostLote />} />
				<Route path="/casas" element={<Casas />} />
				<Route path="/adicionar-casa" element={<PostCasa />} />
			</Routes>
		</Router>
	);
};

export default Rotas;