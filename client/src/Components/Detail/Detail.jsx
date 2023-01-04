import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../redux/actions';
import './Detail.css';


export default function Detail(props){
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getDetail(props.match.params.id));
    },[dispatch, props.match.params.id])
    const myCountry = useSelector ((state) => state.detail)

    return(
        <div className='backgroundDetail'>
            {myCountry.length >0 ?
            <div className='containerDetail'>
                <div className='left'>
                    <h1 className='titleDetail'>{myCountry[0].name}</h1>
                    <img className='imageDetail' src={myCountry[0].flag} alt="flag" />
                </div>
                <div className='description'>
                    <div className='descriptionDetail'>
                        <h2 className='dataDetail'>Capital: {myCountry[0].capital}</h2>
                    </div>
                    <div className='descriptionDetail'> 
                        <h2 className='dataDetail'>Continent: {myCountry[0].continent}</h2>
                    </div>
                    <div className='descriptionDetail'>
                        <h3 className='dataDetail'>Area: {myCountry[0].area} km²</h3>
                    </div>
                    <div className='descriptionDetail'>
                        <h3 className='dataDetail'>Population: {myCountry[0].population}</h3>
                    </div>
                </div>
                <div className="container-activities-cards">
                    {myCountry[0].activities.length? <h1><b>Activities:</b></h1>:
                    <h1 className='h1NoAct'>Sorry, there are no activities at the moment... </h1>}
                    {myCountry[0].activities?.map(e=><div>
                        <ul className="card-activities">
                                <h2>Name: {e.name}</h2>
                                <h2>Difficulty: {e.difficulty}</h2>
                                <h2>Duration: {e.duration}</h2>
                                <h2>Season: {e.season}</h2>
                            </ul>
                        </div>)}
                    </div>
                </div> : <p>Loading...</p>
            }
            <Link to= '/home'>
                <button className='buttonHome'>Return</button>
            </Link>
        </div>
    )
}

