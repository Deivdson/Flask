import './style.css'

import React from 'react'
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import {
    Modal,
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

const PostCasa = () => {
    const [tamanho, setTamanho] = useState('');
    const [usuario, setUsuario] = useState([]);
    const [lote, setLote] = useState([]);
    const [casas, setCasas] = useState([]);
    const token = localStorage.getItem('token')    
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async (e) => {
            const reponseUser = await fetch('http://localhost:5000/user')
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.error(err))
            setUsuario(reponseUser);

            const reponseLote = await fetch('http://localhost:5000/lote')
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.error(err))
            setLote(reponseLote);

            const responseCasa = await
            fetch(`http://localhost:5000/casa/`,{
                method:'GET',
                    headers: {
                    'authorization':`Bearer ${token}`
                }
            })
                .then((casa) => casa.json())
                .then((data) => setCasas(data))
                .catch(err => console.error(err))        
        }
		loadData()
	}, [])
 
    async function handleSubmit(event) {
		event.preventDefault();
		const request = await fetch('http://localhost:5000/casa/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				tamanho,
                usuario,
                lote
			})
		})
		if (request.ok) {
            console.log('Solicitação bem-sucedida');
            console.log('Status do código:', request.status);
          } else {
            console.log('Erro na solicitação');
            console.log('Status do código:', request.status);
          }
	}

	const handleTamanho = (event) => {
		setTamanho(event.target.value)
	}
	const handleLote = (event) => {
		setLote(event.target.value)
	}
	const handleUser = (event) => {
		setUsuario(event.target.value)
	}

	return (
		<div>
            <Navbar />
            <div className='signup'>
                <h1>Adicionar casa</h1><br/>
                <Center className='corpo'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="tamanho">Tamanho</label>
                    <br />
                    <input className='f-input' type="number" name="tamanho" placeholder="Insira o tamanho da casa" title="Insira o tamanho da casa" value={tamanho} onChange={handleTamanho}/>
                    <label className='f-label' htmlFor="lote">Lote</label>
                    <br />
                    <input className='f-input' type="number" name="lote" placeholder="Insira um lote" title="Insira o id do lote" value={lote} onChange={handleLote}/>
                    <label className='f-label' htmlFor="user">Usuário</label>
                    <br />
                    <input className='f-input' type="number" name="user" placeholder="Insira um usuário" title="Insira o id do usuário" value={usuario} onChange={handleUser}/>
                    <br />
                    <br />
                    <button type="submit">Adicionar Casa</button>
                </form>
                <Modal>
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
                </Modal>
                </Center>                
            </div>
		</div>
	);
};

export default PostCasa;