import './style.css'
import React from 'react'
import {useState, useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const Lotes = () => {
    const [lotes, setLotes] = useState([]);
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
				.then((data) => {setLotes(data); console.log(data)})				
				.catch(err => console.error(err))
				if(response && response.status == 403){
					console.log(response)
					navigate('/login/?error=realize-o-login')					

				}
		    }
		loadData()		
	})
	

	return (
		<div id="lotes">
			<Navbar />
			<h3>Lotes</h3>
            {lotes.map((lote) => (
				<div key={lote.id}>
				<p>{lote.endereço}</p>
				<p>{lote.cep}</p>
				<p>{lote.tamanho}</p>

				</div>
            ))}
		</div>
	);
};

export default Lotes;