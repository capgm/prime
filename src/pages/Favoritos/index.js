import { useEffect, useState} from 'react';
import './favoritos.css'
import { Link } from 'react-router-dom';

function Favoritos(){
    
    const [filmes, setFilmes] = useState([])

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@primeflix")
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])


    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item)=>{
            return (item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>

            {filmes.length === 0 && <span>Você não possui filmes na lista de favoritos! :(</span>}

            <ul>
                {filmes.map((item)=>{
                    let caminhoFilme = "/filme/" + item.id
                    return(
                        <li key={item.id}>
                            <span>
                                {item.title}
                            </span>
                            <div>
                                <Link to={caminhoFilme}>Ver detalhes</Link> 
                                    <button onClick={()=>excluirFilme(item.id)}>
                                        Excluir
                                    </button>
                            </div>
                            
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;