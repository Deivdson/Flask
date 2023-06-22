import './style.css'

import React from 'react'
import {useState,useEffect} from 'react'

import Navbar from '../Navbar/Navbar'

const PostLote = () => {
    const [valor, setValor] = useState('')
    const [tamanhoLote, setTamanhoLote] = useState('')
    const [endereco, setEndereco] = useState('')
    const [cep, setCEP] = useState('')
    const [tamanhoCasa, setTamanhoCasa] = useState('')

    const [lote, setLote] = useState([])
    const [usuario, setUsuario] = useState([])

    const token = localStorage.getItem('token')

    useEffect(() => {
        const loadData = async (e) => {
            
            const userReponse = await fetch('http://localhost:5000/user/',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.error(err))
            setUsuario(userReponse)

            const loteReponse = await fetch('http://localhost:5000/lote/',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.error(err))
            setLote(loteReponse)
        }
		loadData()
	}, [])
    
    async function loteSubmit(event) {
		event.preventDefault()        
		const request = await fetch('http://localhost:5000/lote/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				valor,
				tamanhoLote,
                endereco,
                cep,
                usuario_id: usuario[usuario.length - 1].id
			})
		})
		if (request.ok) {
            console.log('Solicitação bem-sucedida')
            console.log('Status do código:', request.status)
            alert('Lote cadastrado com sucesso')
          } else {
            console.log('Erro na solicitação')
            console.log('Status do código:', request.status)
          }
	}

    async function casaSubmit(event) {
		event.preventDefault()        
		const request = await fetch('http://localhost:5000/casa/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				tamanhoCasa,
                usuario_id: usuario[usuario.length - 1].id,
                lote: lote[lote.length - 1].id
			})
		})
		if (request.ok) {
            console.log('Solicitação bem-sucedida')
            console.log('Status do código:', request.status)
          } else {
            console.log('Erro na solicitação')
            console.log('Status do código:', request.status)
          }
	}

	const handleValor = (event) => {
		setValor(event.target.value)
	}

	const handleTamanhoLote = (event) => {
		setTamanhoLote(event.target.value)
	}

	const handleEndereco = (event) => {
		setEndereco(event.target.value)
	}

	const handleCEP = (event) => {
		setCEP(event.target.value)
	}

    const handleTamanhoCasa = (event) => {
		setTamanhoCasa(event.target.value)
	}

	return (
		<div>
            <Navbar />
            <div className='signup'>
                <form className="loteForm" onSubmit={loteSubmit}>
                    <h1>Adicionar lote</h1>
                    <label htmlFor="valor">Valor</label>
                    <br />
                    <input type="number" name="valor" placeholder="Insira o valor do lote" title="Insira o valor do lote" value={valor} onChange={handleValor}/>
                    <br />
                    <br />
                    <label htmlFor="tamanho">Tamanho</label>
                    <br />
                    <input type="number" name="tamanho" placeholder="Insira o tamanho do lote" title="Insira o tamanho do lote" value={tamanhoLote} onChange={handleTamanhoLote}/>
                    <br />
                    <br />
                    <label htmlFor="endereco">Endereço</label>
                    <br />
                    <input type="text" name="endereco" id="endereco" placeholder="Insira o endereço do lote" title="Insira o endereço do lote" value={endereco} onChange={handleEndereco}/>
                    <br />
                    <br />
                    <label htmlFor="endereco">CEP</label>
                    <br />
                    <input type="text" name="endereco" id="endereco" placeholder="Insira o CEP do lote" title="Insira o CEP do lote" value={cep} onChange={handleCEP}/>
                    <br />
                    <br />
                    <button type="submit">Adicionar lote</button>
                </form>

                <form className="casaForm" onSubmit={casaSubmit}>
                    <h1>Adicionar casa</h1>
                    <label htmlFor="tamanho">Tamanho</label>
                    <br />
                    <input type="number" name="tamanho" placeholder="Insira o tamanho da casa" title="Insira o tamanho da casa" value={tamanhoCasa} onChange={handleTamanhoCasa}/>
                    <br />
                    <br />
                    <button type="submit">Adicionar Casa</button>
                </form>
            </div>
		</div>
	)
}

export default PostLote