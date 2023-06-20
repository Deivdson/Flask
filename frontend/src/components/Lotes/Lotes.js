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
                <h4 key={lote.id}>{lote.endereco}, {lote.cep}</h4>
            ))}
		</div>
	);
};

export default Lotes;