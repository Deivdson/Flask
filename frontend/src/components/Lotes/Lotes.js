import './style.css'
import React from 'react'
import {useState, useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const Lotes = () => {
    const [lotes, setLotes] = useState([]);
	const [error, setError] = useState([]);
    const [loading, setLoading] = useState([]);
	const navigate = useNavigate();
	const token = localStorage.getItem('token')
		
    useEffect(() => {
		const loadData = async (e) => {
			const response = await
			fetch(`http://localhost:5000/lote/`, {				
			 	method:'GET',
			  	headers: {
					'authorization':`Bearer ${token}`
				}
			})
				.then((lote) => lote.json())
				.then((data) => setLotes(data))				
				.catch(err =>{
					console.error("Falha ao realizar fetch",err);
					setError(err)
				}).finally(() => {
					setLoading(false)
				})
				if(response && response.status == 403 || !token){					
					navigate('/login/?error=realize-o-login')					

				}

		    }
		loadData()
	}, [])

	const handleDelete = async (id) => {
		const request = await fetch(`http://localhost:5000/lote/delete/${id}`, {
			method: 'DELETE',
			headers: {
				'authorization':`Bearer ${token}`
			}
		})
		if (request.ok) {
            console.log('Solicitação bem-sucedida')
            console.log('Status do código:', request.status)
			alert('Lote deletado com sucesso!')
			navigate('/lotes')
          } else {
            console.log('Erro na solicitação')
            console.log('Status do código:', request.status)
          }
		navigate('/lotes')
	}


	return (
		<div id="lotes">
			<Navbar />
			<h1>Lotes</h1>
			<div className='boxflex'>
			{lotes.map((lote) => (
				<section className='boxcards' key={lote.id}>
					<div>
						<h4>{lote.titulo}</h4>
						<h4>{lote.CEP}</h4>
						<h4>{lote.rua}, {lote.numero} - {lote.bairro} {lote.cidade}/{lote.estado}</h4>
						<h4>{lote.complemento}</h4>
						<h4>{lote.tamanho}m<sup>2</sup></h4>
						<h4>R$ {lote.valor}</h4>
					</div>
					<div className='actionsflex'>
					<button className='actions' onClick={() => handleDelete(lote.id)}>Excluir</button>
					<button className='actions'>Editar</button>
					</div>
				</section>
            ))}
			</div>
		</div>
	)
}

export default Lotes;