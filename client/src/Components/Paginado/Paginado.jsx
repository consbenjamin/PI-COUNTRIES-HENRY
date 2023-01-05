import React from 'react';
import './Paginado.css';

export default function Paginado ({countriesPerPage, allCountries, paginado, currentPage}) {
    const pageNumbers = []; // array usado para guardar la cantidad de paginas necesarias
    
    for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) {
        pageNumbers.push(i)
    };

    return (
        <nav>
            <ul className='pagination'>
                <div>
                    <button className='backnext1' onClick={currentPage > 1 ? () => paginado(currentPage-1): null}>❮❮</button>
                    {pageNumbers && pageNumbers.map(number =>(
                        <li>
                            <button onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))}
                    <button className='backnext2' onClick={currentPage !== pageNumbers.length ?() => paginado(currentPage+1): null}>❯❯</button>
                </div>
            </ul>
        </nav>
    )
}
