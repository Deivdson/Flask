import './style.css'

import React from 'react'
import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';

import Navbar from '../Navbar/Navbar'

const EditLote = () => {
    const [valor, setValor] = useState('')
    const [titulo, setTitulo] = useState('')
    const [tamanhoLote, setTamanhoLote] = useState('')

    const [cep, setCEP] = useState('')
    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [complemento, setComplemento] = useState('')

    const [lote, setLote] = useState([])
    const [usuario, setUsuario] = useState([])

    const id = useParams().id
    console.log(id)
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
	}, [id])

    async function loteSubmit(event) {
		event.preventDefault()
		const request = await fetch(`http://localhost:5000/lote/edit/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				valor,
                titulo,
				tamanho: tamanhoLote,
                rua,
                CEP: cep,
                numero,
                bairro,
                cidade,
                estado,
                complemento,
                user_id: usuario[usuario.length - 1].id
			})
		})
		if (request.ok) {
            console.log('Solicitação bem-sucedida')
            console.log('Status do código:', request.status)
            alert('Lote editado com sucesso')
          } else {
            console.log('Erro na solicitação')
            console.log('Status do código:', request.status)
          }
	}

    function buscaCEP() {
        const value = cep.replace(/[^0-9]+/, '')
        fetch(`https://viacep.com.br/ws/${value}/json/`)
        .then((response) => response.json())
        .then((json) => {
        if (json.logradouro) {
            setRua(json.logradouro)
            setBairro(json.bairro)
            setCidade(json.localidade)
            setEstado(json.uf)
        } else {
            alert(`Não existe localidade para o CEP informado. Erro: ${JSON.stringify(json.erro)}`)
        }
        })
        .catch((error) => {
        alert(`CEP inválido. ${error}`)
        })
    }

	const handleValor = (event) => {
		setValor(event.target.value)
	}

    const handleTitulo = (event) => {
		setTitulo(event.target.value)
	}

	const handleTamanhoLote = (event) => {
		setTamanhoLote(event.target.value)
	}

    const handleCEP = (event) => {
		setCEP(event.target.value)
	}

	const handleRua = (event) => {
		setRua(event.target.value)
	}

    const handleNumero = (event) => {
		setNumero(event.target.value)
	}

    const handleBairro = (event) => {
		setBairro(event.target.value)
	}
    
    const handleCidade = (event) => {
		setCidade(event.target.value)
	}

    const handleEstado = (event) => {
		setEstado(event.target.value)
	}

    const handleComplemento = (event) => {
		setComplemento(event.target.value)
	}

    const handleTamanhoCasa = (event) => {
		setTamanhoCasa(event.target.value)
	}

	return (
		<div>
            <Navbar />
            <div className='signup'>
                <form id="addForm" className="loteForm" onSubmit={loteSubmit} >
                    <h1>Adicionar lote</h1>
                    <label htmlFor="titulo">Titulo</label>
                    <br />
                    <input type="text" name="titulo" id="titulo" placeholder="Insira um titulo para o lote" title="Insira um titulo para o lote" value={lote.titulo || titulo} onChange={handleTitulo} required/>
                    <br />
                    <br />
                    <label htmlFor="valor">Valor</label>
                    <br />
                    <input type="text" name="valor" placeholder="Insira o valor do lote" title="Insira o valor do lote" value={lote.valor || valor} onChange={handleValor} required/>
                    <br />
                    <br />
                    <label htmlFor="tamanho">Tamanho</label>
                    <br />
                    <input type="text" name="tamanho" placeholder="Insira o tamanho do lote" title="Insira o tamanho do lote" value={lote.tamanho || tamanhoLote} onChange={handleTamanhoLote} required/>
                    <br />
                    <br />
                    <label htmlFor="cep">CEP</label>
                    <br />
                    <input type="text" name="cep" id="cep" placeholder="Insira o CEP do lote" title="Insira o CEP do lote" value={lote.CEP || cep} onChange={handleCEP} onBlur={buscaCEP} required/>
                    <br />
                    <br />
                    <label htmlFor="rua">Rua</label>
                    <br />
                    <input type="text" name="rua" id="rua" placeholder="Insira o rua do lote" title="Insira o rua do lote" value={lote.rua || rua} onChange={handleRua} required/>
                    <br />
                    <br />
                    <label htmlFor="numero">Numero</label>
                    <br />
                    <input type="text" name="numero" id="numero" placeholder="Insira o numero do lote" title="Insira o numero do lote" value={lote.numero || numero} onChange={handleNumero} required/>
                    <br />
                    <br />
                    <label htmlFor="bairro">Bairro</label>
                    <br />
                    <input type="text" name="bairro" id="bairro" placeholder="Insira o bairro do lote" title="Insira o bairro do lote" value={lote.bairro || bairro} onChange={handleBairro} required/>
                    <br />
                    <br />
                    <label htmlFor="cidade">Cidade</label>
                    <br />
                    <input type="text" name="cidade" id="cidade" placeholder="Insira a cidade do lote" title="Insira a cidade do lote" value={lote.cidade || cidade} onChange={handleCidade} required/>
                    <br />
                    <br />
                    <label htmlFor="estado">Estado</label>
                    <br />
                    <input type="text" name="estado" id="estado" placeholder="Insira o estado do lote" title="Insira o estado do lote" value={lote.estado || estado} onChange={handleEstado} required/>
                    <br />
                    <br />
                    <label htmlFor="complemento">Complemento</label>
                    <br />
                    <input type="text" name="complemento" id="complemento" placeholder="Insira o complemento do lote" title="Insira o complemento do lote" value={lote.complemento || complemento} onChange={handleComplemento}/>
                    <br />
                    <br />
                    <button type="submit">Adicionar lote</button>
                </form>
            </div>
		</div>
	)
}

export default EditLote