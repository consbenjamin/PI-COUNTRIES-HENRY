const initialState = {
    countries: [], //este array se va a ir modificando segun los filtros que aplique en el front
    allCountries: [], //este array va a tener siempre TODOS los paises
    detail: []
}

export default function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            };
        case 'GET_BY_NAME':
            return {
                ...state,
                countries: action.payload
            };
        case 'POST_ACTIVITY':
            return {
                ...state
            };
        case 'FILTER_BY_CONTINENT':
            const allCountries = state.allCountries
            const continentFiltered = action.payload === 'All' ? allCountries : allCountries.filter(el => el.continent === action.payload)
            return {
                ...state,
                countries: continentFiltered
            };

        case 'FILTER_BY_ACTIVITY':
            const countries = state.countries
            const activityFiltered = action.payload === 'act' ? countries.filter(el => el.activities.length !== 0)
            : action.payload === 'noA' ? countries.filter(el => !el.activities.length) : countries
            return {
                ...state,
                countries: activityFiltered
            };

            
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ?
            state.countries.sort(function(a, b){
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }):
            state.countries.sort(function(a, b){
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                countries: sortedArr
            };
        case 'ORDER_BY_POPULATION':
            let sortPopArr = action.payload === 'asc' ?
            state.countries.sort(function(a, b){
                if (a.population > b.population) {
                    return 1;
                }
                if (b.population > a.population) {
                    return -1;
                }
                return 0;
            }):
            state.countries.sort(function (a, b){
                if (a.population > b.population) {
                    return -1;
                }
                if(b.population > a.population) {
                    return 1;
                }
                return 0;
            });
            return {
                ...state,
                countries: sortPopArr
            };
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            };
        default: return state;
    }
};

