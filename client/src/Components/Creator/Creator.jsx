import React from 'react';
import { useState, useEffect } from 'react';
import { getCountries, postActivities } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import './Creator.css';
import { Link, useHistory } from 'react-router-dom';


export default function Creator(){
    const dispatch = useDispatch()
    const Countries = useSelector((state)=> state.countries)
    const history = useHistory()
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name:"",
        difficulty:"",
        duration:"",
        season:"",
        countriesName:[]
    })
    useEffect(()=> {    // Como siempre, un hook que es llamado, cuando el componente ya es montado
        dispatch(getCountries())
    },[dispatch]);
    
    function validate(input){
        let errors={};
        if (!input.name) errors.name ='Name is a required field!';
        
        if (input.name.length > 20) errors.name = 'Name must be under 20 characters.';
        if (input.name.length < 3) errors.name = 'Name must be greater than 3 characters';
        
        if (!input.duration) errors.duration = 'Duration is a required field!';
        
        if (input.duration <= 0 || input.duration > 24) errors.duration = 'Duration must be between 1 and 24 hours';
        
        if (!input.season) errors.season = 'Please, select a season';
        
        if (!input.difficulty) errors.difficulty = 'Please, select a difficulty';

        if (!input.countriesName.length) errors.countriesName = 'Please, select a country';
        
        return errors
    }
    
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleCountrySelect(e){
        if(input.countriesName.includes(e.target.value)) //Si mi estado local input.countriesName... incluye el value, retorna una alerta
        return alert("Ya seleccionaste este pais")
        const index = Countries.findIndex(object => {
            return object.name === e.target.value
        })
        if (index > -1){
            Countries.splice(index, 1)
        }
        setInput({
            ...input,
            countriesName: [...input.countriesName, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleSelect(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleDelete(e){
        setInput({
            ...input,
            countriesName: input.countriesName.filter(f=>f!==e)
        })
        Countries.push(e)
        console.log(e)
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(postActivities(input))
        alert("Activity created!")
        console.log(input)
        setInput({
            name:"",
            difficulty:"",
            duration:"",
            season:"",
            countriesName:[]
        })
        history.push('/home')
    };


    return (
        <div className='creator'>
            <div className='nav'>
                <Link to ='/home'><button className='buttonBack'>Return</button></Link>
            </div>
            <div className='creatorAll'>
                <div className='creatorMenu'>
                    <h1 className='creatorTitle'>Create Activity✈️</h1>
                    <div className='allFields'>
                        <form onSubmit={(el) => handleSubmit(el)}>
                            <div className='areaInicio'>
                                <div className='wrapperDual'>
                                    <label>Activity:</label>
                                    <input className='createField' type='text' value={input.name} name='name' placeholder='Name' onChange={handleChange}/>
                                    {errors.name&&(
                                        <p className="errors">{errors.name}</p>
                                    )}
                                </div>
                                <div className='wrapperDual'>
                                    <label>Difficulty:</label>
                                    <select className='selectCreator' defaultValue={'default'} name='difficulty' onChange={e=>handleSelect(e)}>
                                        <option value='default' disabled selected>Difficulty</option>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </select>
                                </div>
                                <div>
                                    {errors.difficulty&&(
                                        <p className='errors'>{errors.difficulty}</p>
                                    )}
                                </div>
                                <div className='wrapperDual'>
                                    <label>Duration in hours (Max:24):</label>
                                    <input className='createField' type='number' value={input.duration} name='duration' placeholder='Duration' onChange={handleChange}/>
                                    {errors.duration &&(
                                        <p className='errors'>{errors.duration}</p>
                                    )}
                                </div>
                                <div className='wrapperDual'>
                                    <label>Season:</label>
                                    <select className='selectCreator' defaultValue={'default'} name='season' onChange={e=>handleSelect(e)}>
                                        <option value='default' disabled selected>Season</option>
                                        <option value='summer'>Summer</option>
                                        <option value='winter'>Winter</option>
                                        <option value='autumn'>Autumn</option>
                                        <option value='spring'>Spring</option>
                                    </select>
                                    <div>{errors.season&&(
                                        <p className='errors'>{errors.season}</p>
                                    )}
                                    </div>
                                </div>
                                <div className='wrapperDual'>
                                    <label>Country:</label>
                                    <select className='selectCreator' defaultValue={'default'} name='countriesName' onChange={e=>handleCountrySelect(e)}>
                                        <option value='default' disabled selected>Select a Country:</option>
                                        {Countries.map(c=> {
                                            return (
                                                <option value={c.name}>{c.name}</option>
                                            )
                                        })}
                                    </select>
                                    {errors.countriesName&&(
                                        <p className='errors'>{errors.countriesName}</p>
                                    )}
                                </div>
                            </div>
                            { //VALIDACION DE ESTADO PARA HABILITAR BOTON
                                input.name ===''|| input.difficulty === ''|| input.duration ==='' || input.season ===''
                                || input.countriesName ===''
                                || errors.name || errors.difficulty || errors.duration || errors.season || errors.countriesName
                                ||!input.countriesName.length
                                ?                        
                            <button disabled className='button_block'>
                                <span> The form contains errors. </span>
                            </button>
                            :
                            <button onClick={el=>handleSubmit(el)} className='createButton' type="submit">Create Activity</button>
                            }
                        </form>
                        {input.countriesName.map(c=> 
                            <div className="form">
                                <p>{c}
                                <button className="buttonX" onClick={()=>handleDelete(c)}>X</button> 
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>    
    )
};










