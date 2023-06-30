import './style.css'
import React from 'react'
import {useState, useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const Lotes = () => {
    const [lotes, setLotes] = useState([]);
	const [casas, setCasas] = useState([]);
	const [erro, setError] = useState([]);
    const [loading, setLoading] = useState([]);
	const navigate = useNavigate();
	const token = localStorage.getItem('token')
	
    useEffect(() => {
		const loadData = async (e) => {
			const response = await fetch(`http://localhost:5000/lote/`, {				
			 	method:'GET',
			  	headers: {
					'authorization':`Bearer ${localStorage.getItem('token')}`
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
				if((response && response.status === 403) || !localStorage.getItem('token')) navigate('/login/?error=realize-o-login')

			const responseCasa = await fetch(`http://localhost:5000/casa/`, {				
			method:'GET',
			headers: {
				'authorization':`Bearer ${localStorage.getItem('token')}`
			}})
			.then((casa) => casa.json())
			.then((data) => setCasas(data))
		    }
		loadData()
		// eslint-disable-next-line
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
						<h4 className='titulo'>{lote.titulo}</h4>
						<h4 className='endereco'>Endereço:</h4>
						<p className='endereco'>{lote.rua}, {lote.numero} - {lote.bairro}</p>
						<p className='endereco'>{lote.cidade}/{lote.estado} {lote.CEP}</p>
						<p className='endereco'>{lote.complemento}</p>
						<h4 className='tamanho'>Tamanho:</h4>
						<p className='tamanho'>{lote.tamanho}m<sup>2</sup></p>
						<h4 className='valor'>Valor:</h4>
						<p className='valor'>R$ {lote.valor}</p>
						{casas.map((casa) => (
							<div key={casa.id}>
								<h4 className='temCasa'>Tem casa?</h4>
								<p className='temCasa'>{lote.id === casa.id ? `Sim, ${casa.tamanho}m²` : "Não"}</p>
							</div>
            			))}
					</div>
					<div className='actionsflex'>
						<button className='actions' onClick={() => handleDelete(lote.id)}>Excluir</button>
						<button className='actions'><a href={`/editar-lote/${lote.id}`}>Editar</a></button>
					</div>
				</section>
            ))}
			</div>
		</div>
	)
}

export default Lotes