import './style.css'
import React from 'react'
import {useState, useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Center 
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'


const Casas = () => {
    const [casas, setCasas] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState([]);
	const token = localStorage.getItem('token')
	const navigate = useNavigate()
	
    useEffect(() => {
		const loadData = async (e) => {
			const response = 
			fetch(`http://localhost:5000/casa/`,{
				method:'GET',
			  	headers: {
					'authorization':`Bearer ${token}`
				}
			})
				.then((casa) => casa.json())
				.then((data) => setCasas(data))
				.catch(err => {
					console.error("Falha ao realizar fetch",err);
					setError(err)
					
				}).finally(() => {
					setLoading(false)
				})
				if((response && response.status == 403) || !token){					
					navigate('/login/?error=realize-o-login')					
				}				
		    }
		loadData()
	},[])


	return (
		<div id="casas">
			<Navbar />
			<h1>Casas</h1>
			<Center className='tabela'>
				<TableContainer>
				<Table variant='simple'>					
					<Thead>
					<Tr>
						<Th>Lote_id</Th>
						<Th>User_id</Th>
						<Th isNumeric>Tamanho</Th>
					</Tr>
					</Thead>
					<Tbody>
						{casas.map((casa) => (				          
						<Tr key={casa.id}>
							<Td>{casa.lote_id}</Td>
							<Td>{casa.user_id}</Td>
							<Td>{casa.tamanho}</Td>
						</Tr>
						))}
					</Tbody>
					<Tfoot>
					<Tr>
						<Th>Lote_id</Th>
						<Th>User_id</Th>
						<Th isNumeric>Tamanho</Th>
					</Tr>
					</Tfoot>
				</Table>
				</TableContainer>
			</Center>
		</div>
	);
};

export default Casas;