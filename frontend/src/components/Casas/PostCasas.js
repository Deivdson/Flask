import './style.css'

import React from 'react'
import {useState,useEffect} from 'react'

import Navbar from '../Navbar/Navbar'

const PostCasa = () => {
    const [tamanho, setTamanho] = useState('');
    const [usuario, setUsuario] = useState([]);
    const [lote, setLote] = useState([]);

    useEffect(() => {
        const loadData = async (e) => {
            const reponseUser = await fetch('http://localhost:5000/user')
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.error(err))
            setUsuario(reponseUser);

            const reponseLote = await fetch('http://localhost:5000/lote')
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.error(err))
            setLote(reponseLote);
        }
		loadData()
	}, [])

    async function handleSubmit(event) {
		event.preventDefault();
		const request = await fetch('http://localhost:5000/casa/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				tamanho,
                usuario: usuario[usuario.length - 1].id,
                lote: lote[lote.length - 1].id
			})
		})
		if (request.ok) {
            console.log('Solicitação bem-sucedida');
            console.log('Status do código:', request.status);
          } else {
            console.log('Erro na solicitação');
            console.log('Status do código:', request.status);
          }
	}

	const handleTamanho = (event) => {
		setTamanho(event.target.value)
	}

	return (
		<div>
            <Navbar />
            <div className='signup'>
                <h1>Adicionar casa</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="tamanho">Tamanho</label>
                    <br />
                    <input type="number" name="tamanho" placeholder="Insira o tamanho da casa" title="Insira o tamanho da casa" value={tamanho} onChange={handleTamanho}/>
                    <br />
                    <br />
                    <button type="submit">Adicionar Casa</button>
                </form>
            </div>
		</div>
	);
};

export default PostCasa;