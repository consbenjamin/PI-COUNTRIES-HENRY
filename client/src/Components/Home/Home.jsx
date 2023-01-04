import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, filterByContinent, filterByActivities, orderByName, orderByPopulation } from '../../redux/actions';
import { Link } from 'react-router-dom';
import './Home.css';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';

export default function Home () {
    const dispatch = useDispatch() //para despachar las acciones con la constante
    const allCountries = useSelector((state) => state.countries) //equivalente a mapStateToProps

    //paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(10);
    const indexOfLastCountry = currentPage === 1 ? 9 : currentPage * countriesPerPage-1;
    const indexOfFirstCountry = currentPage === 1 ? 0 : indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    const [order, setOrder] = useState('');
    const [orderPop, setOrderPopulation] = useState('');

    //Me traigo el estado de los countries cuando el componente se monta
    useEffect(()=>{
        dispatch(getCountries())
    }, [dispatch])

    //HANDLERS

    function handleClick(el){
        el.preventDefault(); //evita que se me recargue la pagina inecesariamente y que se vuelvan a cargar los estados de redux
        dispatch(getCountries());
        setCurrentPage(1);
    }

    function handleFilterContinents(el) {
        dispatch(filterByContinent(el.target.value))
        setCurrentPage(1);
    }

    function handleFilterByActivities(el) {
        dispatch(filterByActivities(el.target.value))
        setCurrentPage(1);
    }

    function handleSortName(el) {
        el.preventDefault();
        dispatch(orderByName(el.target.value))
        setCurrentPage(1);//seteo para que la pagina default arranque en 1
        setOrder(`Sort ${el.target.value}`); // para que cuando setea la pagina modifique el estado local y se renderize
    }

    function handleSortPopulation(el) {
        el.preventDefault();
        dispatch(orderByPopulation(el.target.value));
        setCurrentPage(1);
        setOrderPopulation(`Sort ${el.target.value}`);
    }

    const handleClear = () => {
        dispatch(getCountries());
    }


    return (
        <div className='home'>
            <div className='navBg'>
                <h1>HENRY COUNTRIES🌎</h1>
                <div className='filterOrder'>
                    <select onChange={el => handleSortName(el)}>
                        <option disabled selected>Order Alphabetically</option>
                        <option value='asc'>Name (A-Z)</option>
                        <option value='des'>Name (Z-A)</option>
                    </select>
                    <select onChange={el => handleSortPopulation(el)}>
                        <option disabled selected>Order by Population</option>
                        <option value='asc'>Ascendent</option>
                        <option value='des'>Descendent</option>
                    </select>
                    <select onChange={el => handleFilterByActivities(el)}>
                        <option disabled selected>Filter by Activity</option>
                        <option value='all'>All</option>
                        <option value='act'>Activities</option>
                        <option value='noA'>No Activities</option>
                    </select>
                    <select onChange={el => handleFilterContinents(el)}>
                        <option disabled selected>Filter by Continent</option>
                        <option value='All'>All</option>
                        <option value='Africa'>Africa</option>
                        <option value='Antarctica'>Antarctica</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europe</option>
                        <option value='South America'>South America</option>
                        <option value='North America'>North America</option>
                        <option value='Oceania'>Oceania</option>
                    </select>
                    <button className='clearFilter' onClick={handleClear}>Clear Filter</button>
                    <div className='createActivity'>
                        <Link to='/activities'>
                            <button className='creatorButton default'>Create Activity</button>
                        </Link>
                    </div>
                </div>
                <div className='rightNav'>
                    <div className='search'>
                    </div>
                </div>
                <Paginado
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paginado={paginado}
                currentPage={currentPage}
                />
                <SearchBar handleClick={handleClick}/>
            </div>
            <div className='containerCountries'>
                {currentCountries?.map((el) => {
                    return (
                        <Card
                        name={el.name}
                        flag={el.flag}
                        continent={el.continent}
                        id={el.id}
                        />
                    )
                })}
            </div>
        </div>
    )
};