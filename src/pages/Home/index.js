import { useEffect, useState } from "react";
import api from '../../services/api'
import {Link} from 'react-router-dom'
import './home.css'

function Home(){
    
    const [filmes, setFilmes] = useState([]);
    const [loading,setLoading] = useState(true);
    
    useEffect(()=>{

        async function loadFilmes(){
            const response = await api.get("movie/popular", {
                params:{
                    api_key: 'fae6e5190826a5593c6d6e941f488721',
                    language: 'pt-BR',
                    page: 1
                }
            })

            console.log(response.data.results.slice(0,10))
        
            setFilmes(response.data.results.slice(0,10)) 
            setLoading(false)   
        
        }

        loadFilmes();

    },[])

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando......</h2>
            </div>
        )
    }

    return(
        <div>
                <div className="container">
                    <div className="lista-filmes">
                        {filmes.map((filme)=>{
                            let id = filme.id
                            let caminho = "https://image.tmdb.org/t/p/original" + filme.poster_path
                            return(
                                <article key={filme.id}>
                                    <strong>
                                        {filme.title}
                                    </strong>
                                    <img src={caminho} alt={filme.title}/>
                                    <Link to={'/filme/' + id}>Acessar</Link>
                                </article>
                            )
                        })}
                    </div>
                </div>

        </div>    
    )
}

export default Home;