import './style.css'

import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import Navbar from '../Navbar/Navbar'

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [setErr] = useState(false);

    async function handleSubmit(event) {
		event.preventDefault();
		const request = await fetch('http://localhost:5000/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				'username':username,
				'password':password,
        'name':name,
        'email':email
			}),
		})
		if (request.ok) {
            console.log('Solicitação bem-sucedida');
            console.log('Status do código:', request.status);
            console.log(request.body)
          } else {
            console.log('Erro na solicitação');
            console.log('Status do código:', request.status);
          }
    const response = await request.json();
    console.log(response)

    if (request.status === 200) {
      console.log("Setando token")
			localStorage.setItem('token', response.token);
			navigate('/login');
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

	const handleName = (event) => {
		setName(event.target.value)
	}

	const handleEmail = (event) => {
		setEmail(event.target.value)
	}

	return (
		<div>
      <Navbar />
      <div className='signup'>
        <h1>Cadastre-se</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="password">Nome</label>
            <br />
            <input type="text" name="name" id="name" placeholder="Insira seu nome" title="Insira seu nome" value={name} onChange={handleName} />
            <br />
            <br />
            <label htmlFor="password">Email</label>
            <br />
            <input type="email" name="email" id="email" placeholder="Insira seu email" title="Insira seu email" value={email} onChange={handleEmail}/>
            <br />
            <br />
            <label htmlFor="email">Username</label>
            <br />
            <input type="text" name="text" placeholder="Insira seu nome de usuario" title="Insira seu nome de usuário" value={username} onChange={handleUsername}/>
            <br />
            <br />
            <label htmlFor="password">Senha</label>
            <br />
            <input type="password" name="password" id="password" placeholder="Insira sua senha" title="Insira sua senha" value={password} onChange={handlePassword}/>
            <br />
            <br />
            <button type="submit">Cadastrar</button>
        </form>
      </div>
		</div>
	);
};

export default SignUp;