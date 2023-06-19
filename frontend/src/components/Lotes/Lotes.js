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
            {lotes.map((lote) => (
                <p key={lote.id}>{lote.endereco}</p>
            ))}
		</div>
	);
};

export default Lotes;