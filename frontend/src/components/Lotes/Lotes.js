import './style.css'
import React from 'react'
import {useState, useEffect} from 'react'
import Navbar from '../Navbar/Navbar'

const Lotes = () => {
    const [lotes, setLotes] = useState([]);

    useEffect(() => {
		const loadData = async (e) => {
			fetch(`http://localhost:5000/lote/`, {				
			 	method:'GET',
			  	headers: {
					'authorization':`Bearer ${localStorage.getItem('token')}`
				}
			})
				.then((lote) => lote.json())
				.then((data) => setLotes(data))				
				.catch(err => console.error(err))
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
				<p>{lote.m&rbrace}</p>
				</div>
            ))}
		</div>
	);
};

export default Lotes;