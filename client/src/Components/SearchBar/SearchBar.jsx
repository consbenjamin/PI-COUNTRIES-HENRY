import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from '../../redux/actions';
import './SearchBar.css';

export default function Searchbar (){
    const dispatch = useDispatch();
    const [name, setName] = useState('');


function handleInputChange(el){
    el.preventDefault()
    setName(el.target.value)
};

function handleSubmit(el){
    el.preventDefault()
    dispatch(getByName(name))
    setName('')
};

    return (
        <div>
            <input
            className='inputSearch'
            type='search'
            placeholder='Enter a country'
            onChange={(el) => handleInputChange(el)}
            />
            <button className='buttonSearch' type='submit' onClick={(el) => handleSubmit(el)}>Search</button>
        </div>
    )

}
