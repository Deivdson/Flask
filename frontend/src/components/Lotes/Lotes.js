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

	return (
		<div id="lotes">
			<Navbar />
			<h1>Lotes</h1>
            {lotes.map((lote) => (
				<section className='boxcards' key={lote.id}>
					<div>
						<h4>{lote.endereço}</h4>
						<h4>{lote.cep}</h4>
						<h4>{lote.tamanho} metros</h4>
						<h4>R$ {lote.valor},00</h4>
					</div>
				</section>
            ))}
		</div>
	)
}

export default Lotes;