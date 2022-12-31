import React from 'react';
import { useState, useEffect } from 'react';
import { getCountries, postActivities } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import './Creator.css';
import { Link, useHistory } from 'react-router-dom';


//validador de errores de los inputs

function validate(input) {
    const errors = {};

    if (!input.name) errors.name = 'Name is a required field!';
    if (input.name.length > 20) errors.name = 'Name must be under 20 characters.';
    if (input.name.length < 3) errors.name = 'Name must be greater than 3 characters';

    if (!input.duration) errors.duration = 'Duration is a required field!';
    else if (input.duration <= 0 || input.duration > 24) errors.duration = 'Duration must be between 1 and 24 hours';

    if (!input.season) errors.season = 'Please, select a season';

    if (!input.countriesName) errors.countriesName = 'Please, select a country';

    if (!input.difficulty) errors.difficulty = 'Please, select a difficulty';
    
    return errors;
};

export default function Creator() {
    const dispatch = useDispatch();
    const history = useHistory();
    const countries = useSelector((state) => state.countries);

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name:"",
        difficulty:0,
        duration:0,
        season:"",
        countriesName:[]
    });

    useEffect(() => {   //un hook que es llamado, cuando el componente ya esta montado
        dispatch(getCountries())
    },[dispatch]);

/////////////////////////////////////////////HANDLERS//////////////////////////////////////////////////////////////////////

    function handleChange (el) {
        setInput({
            ...input,
            [el.target.name] : el.target.value
        })
        setErrors(validate({
            ...input,
            [el.target.name] : el.target.value
        }))
    };

    function handleSelect (el) {
        setInput({
            ...input,
            [el.target.name] : el.target.value
        })
        setErrors(validate({
            ...input,
            [el.target.name] : el.target.value
        }))
    };

    function handleCountrySelect (el) {
        if(input.countriesName.includes(el.target.value)) //si mi estado local input.countriesName incluye el value, retorna una alerta
        return alert('Country already selected');

        // const index = countries.findIndex(el => {
        //     return el.name === el.target.value
        // })
        // if (index > -1){
        //     countries.splice(index, 1);
        // }
        setInput({
            ...input,
            countriesName: [...input.countriesName, el.target.value]
        })
        setErrors(validate({
            ...input,
            [el.target.name] : el.target.value
        }))
    };

    function handleDelete (e) {
        setInput({
            ...input,
            countriesName: input.countriesName.filter(f=>f!==e)
        })
        countries.push(e)
        console.log(e)
    }

    function handleSubmit (el) {
        el.preventDefault();
        dispatch(postActivities(input))
        alert('Activity created succesfully!')
        console.log(input)
        setInput({
            name:"",                                                        
            difficulty:0,
            duration:0,
            season:"",
            countriesName:[]
        })
        history.push('/home')
    };

    console.log(input)
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className='creator'>
            <div className='nav'>
                <Link to ='/home'><button className='buttonBack'>Volver</button></Link>
            </div>
            <div className='creatorAll'>
                <div className='creatorMenu'>
                    <h1 className='creatorTitle'>Create Activity</h1>
                    <div className='allFields'>
                        <form onSubmit={(el) => handleSubmit(el)}>
                            <div className='areaInicio'>
                                <div className='wrapperDual'>
                                    <label>Name:</label>
                                    <input className='createField' type='text' value={input.name} name='name' placeholder='Name' onChange={(el) => handleChange(el)}/>
                                    <div>{ input.name === '' ? <p className='errors'>*Obligatory Field</p> :
                                        <p className='errors'>{errors.name}</p>
                                    }</div>
                                </div>
                                <div className='wrapperDual'>
                                    <label>Difficulty:</label>
                                    <select name='difficulty' onChange={el => handleSelect(el)}>
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
                                    <input className='createField' type='number' value={input.duration} name='duration' placeholder='Duration' onChange={(el) => handleChange(el)}/>
                                    {errors.duration &&(
                                        <p className='errors'>{errors.duration}</p>
                                    )}
                                </div>
                                <div className='wrapperDual'>
                                    <label>Season:</label>
                                    <select name='season' onChange={el => handleSelect(el)}>
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
                                    <select name='countriesName' onChange={el => handleCountrySelect(el)}>
                                        <option value='default' disabled selected>Select a Country:</option>
                                        {countries.map(el=> {
                                            return (
                                                <option value={el.name}>{el.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            { //VALIDACION DE ESTADO PARA HABILITAR BOTON
                                input.name ===''|| input.difficulty === ''|| input.duration ==='' || input.season ===''
                                || input.countriesName ===''
                                || errors.name || errors.difficulty || errors.duration || errors.season || errors.countriesName
                                ||!input.countriesName.length
                                ?                        
                            <button disabled className='button_block'>
                                <span> Errores en el Formulario </span>
                            </button>
                            :
                            <button onClick={el=>handleSubmit(el)} className='createButton' type="submit">Create Activity</button>
                            }
                        </form>
                        {input.countriesName.map(c=> 
                            <div className="form">
                                <p>{c}
                                <button className="boton" onClick={()=>handleDelete(c)}>X</button> 
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>    
    )
};
