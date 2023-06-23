import './style.css'

import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';


import Navbar from '../Navbar/Navbar'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [setErr] = useState(false);

    async function handleSubmit(event) {
		event.preventDefault();
		const request = await fetch('http://localhost:5000/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				'email':username,
				'password':password
			}),
		})
    const response = await request.json();
		if (request.ok) {
          console.log('Solicitação bem-sucedida');
          console.log('Status do código:', request.status);
        } else {
          console.log('Erro na solicitação');
          console.log('Status do código:', request.status);
        }

    if (request.status === 200) {
			localStorage.setItem('token', response.token);

			localStorage.setItem('username',response.user.username);			
			localStorage.setItem('name',response.user.name);			
			localStorage.setItem('email',response.user.email);			
      
			navigate('/');
		}
		if (request.status === 401) {
			setErr(true)
		}

	}

    const handleUsername = (event) => {
		setUsername(event.target.value)
	}

	const handlePassword = (event) => {
		setPassword(event.target.value)
	}

	return (
		<div>
      <Navbar />
      <div className='login'>
        <h1>Entrar</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <br />
            <input type="text" name="text" placeholder="Insira seu email" title="Insira seu email" value={username} onChange={handleUsername}/>
            <br />
            <br />
            <label htmlFor="password">Senha</label>
            <br />
            <input type="password" name="password" id="password" placeholder="Insira sua senha" title="Insira sua senha" value={password} onChange={handlePassword}/>
            <br />
            <br />
            <button type="submit">Entrar</button>
        </form>
      </div>
		</div>
	);
};

export default Login;