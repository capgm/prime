import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import './filme-info.css';

function Filme(){

    const {id} = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilm(){

            let caminho = '/movie/'+ id

            await api.get(caminho,{
                params:{
                    api_key: 'fae6e5190826a5593c6d6e941f488721',
                    language: 'pt-BR',
                    page: 1
                }
            }).then((reponse)=>{
                setFilme(reponse.data)
                setLoading(false)
            }).catch(()=>{
                navigate("/", {replace: true});
                return;
            })
        }

        loadFilm();

        return () =>{
            console.log("Componente foi desmontado")
        }
    },[navigate,id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id)

        if(hasFilme){
            alert("Esse filme ja existe na lista")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))

    }


    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes</h1>
            </div>
        )
    }

    let caminhoCapa = 'https://image.tmdb.org/t/p/original/' + filme.backdrop_path;
    let urlYouTube = 'https://www.youtube.com/results?search_query=' + filme.title + ' Trailer';

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>    
            <img src={caminhoCapa} alt={filme.title}/>
            <h2>Sinopse</h2>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.average} / 10</strong>

            <div className="area-buttons"> 
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="_blank" rel="external" href={urlYouTube}>Trailer</a>                    
                </button>
            </div>

        </div>    
    )
}

export default Filme;