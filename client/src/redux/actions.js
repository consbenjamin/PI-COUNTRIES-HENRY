import axios from 'axios';

export function getCountries(){
    return async function(dispatch) {
        const json = await axios.get('http://localhost:3001/countries'); //Conexion entre el front y el back.
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
};

export function getByName(name) {
    return async function(dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/countries?name=${name}`)
            return dispatch({
                type: 'GET_BY_NAME',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function getDetail(id) {
    return async function(dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/countries/${id}`)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function postActivities(payload) {
    return async function(dispatch) {
        try {
            const response = await axios.post(`http://localhost:3001/activities`, payload)
            console.log(response)
            return response
        } catch (error) {
            console.log(error);
        }
    }
};

export function filterByContinent(payload) {
    return {
        type: 'FILTER_BY_CONTINENT',
        payload,
    }
};

export function filterByActivities(payload) {
    return {
        type: 'FILTER_BY_ACTIVITY',
        payload,
    }
};

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload,
    }
};

export function orderByPopulation(payload) {
    return {
        type: 'ORDER_BY_POPULATION',
        payload,
    }
};
