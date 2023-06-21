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