import './style.css'
import React from 'react'
import {useState, useEffect} from 'react'
import Navbar from '../Navbar/Navbar'

const Casas = () => {
    const [casas, setCasas] = useState([]);

    useEffect(() => {
		const loadData = async (e) => {
			fetch(`http://localhost:5000/casa`)
				.then((casa) => casa.json())
				.then((data) => setCasas(data))
				.catch(err => console.error(err))
		    }
		loadData()
	})

	return (
		<div id="casas">
			<Navbar />
            {casas.map((casa) => (
                <p key={casa.id}>{casa.endereco}</p>
            ))}
		</div>
	);
};

export default Casas;