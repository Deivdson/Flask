import { useNavigate } from 'react-router-dom'
import {useState, useEffect, Component} from 'react'
const token = localStorage.getItem('token')

export default class api extends  Component{
    constructor(props){
        this.state = {
            host: 'localhost:5000'
        }

        function get(endpoint){
            const navigate = useNavigate()
	
            useEffect(() => {
                const loadData = async (e) => {
                    const response = 
                    fetch(`${host}${endpoint}`,{
                        method:'GET',
                        headers: {
                            'authorization':`Bearer ${token}`
                        }
                    })
                        .then((casa) => casa.json())
                        .then((data) => setCasas(data))
                        .catch(err => console.error(err))
                        if(response.status == 403){
                            console.log(response)
                            navigate('/login/?error=realize-o-login')					
                        }				
                    }
                loadData()
            })
        }
    }
}