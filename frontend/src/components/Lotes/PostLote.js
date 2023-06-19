import './style.css'

import React from 'react'
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import Navbar from '../Navbar/Navbar'

const PostLote = () => {
    const [valor, setValor] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cep, setCEP] = useState('');

    const id = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (id == null) {
            navigate('/');
        }
	})

    async function handleSubmit(event) {
		event.preventDefault();
        const token = localStorage.getItem('token');
		const request = await fetch('http://localhost:5000/lote/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				valor,
				tamanho,
                endereco,
                cep
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

	const handleValor = (event) => {
		setValor(event.target.value)
	}

	const handleTamanho = (event) => {
		setTamanho(event.target.value)
	}

	const handleEndereco = (event) => {
		setEndereco(event.target.value)
	}

	const handleCEP = (event) => {
		setCEP(event.target.value)
	}

	return (
		<div>
            <Navbar />
            <div className='signup'>
                <h1>Adicionar lote</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="valor">Valor</label>
                    <br />
                    <input type="number" name="valor" placeholder="Insira o valor do lote" title="Insira o valor do lote" value={valor} onChange={handleValor}/>
                    <br />
                    <br />
                    <label htmlFor="tamanho">Tamanho</label>
                    <br />
                    <input type="number" name="tamanho" placeholder="Insira o tamanho do lote" title="Insira o tamanho do lote" value={tamanho} onChange={handleTamanho}/>
                    <br />
                    <br />
                    <label htmlFor="endereco">Endereço</label>
                    <br />
                    <input type="text" name="endereco" id="endereco" placeholder="Insira o endereço do lote" title="Insira o endereço do lote" value={endereco} onChange={handleEndereco}/>
                    <br />
                    <br />
                    <label htmlFor="endereco">CEP</label>
                    <br />
                    <input type="text" name="endereco" id="endereco" placeholder="Insira o CEP do lote" title="Insira o CEP do lote" value={cep} onChange={handleCEP}/>
                    <br />
                    <br />
                    <button type="submit">Adicionar lote</button>
                </form>
            </div>
		</div>
	);
};

export default PostLote;