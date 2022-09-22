let countries = [
    {
        id: 1, 
        name: 'Buthan',
        alpha2Code: 'BT',
        alpha3Code: 'BTN',
    },
    {
        id: 2, 
        name: 'Algeria',
        alpha2Code: 'DZ',
        alpha3Code: 'DZA',
    },
    {
        id: 3, 
        name: 'American Samoa',
        alpha2Code: 'AS',
        alpha3Code: 'ASM',
    },
    {
        id: 4, 
        name: 'Andorra',
        alpha2Code: 'AD',
        alpha3Code: 'AND',
    },
    {
        id: 5, 
        name: 'Bahamas (the)',
        alpha2Code: 'BS',
        alpha3Code: 'BHS',
    },
    {
        id: 6, 
        name: 'French Polynesia',
        alpha2Code: 'PF',
        alpha3Code: 'PYF',
    },
]

function _getCountryIndexById(id) {
    return countries.findIndex((country) => {
        return country.id === parseInt(id)
    })
}

export const getCountries = function() {
    return countries;
}

export const findCountry = function(id) {
    const index =  _getCountryIndexById(id);
    if (index < 0) {
        throw new Error(`Country with id ${id} does not exist`)
    }
    return countries[index]
}

export const deleteCountry = function(id) {
    const index =  _getCountryIndexById(id);
    if (index < 0) {
        throw new Error(`Country with id ${id} does not exist`)
    }
    //countries = countries.splice(index, 1)
    delete countries[index]
    return countries
}

export const updateCountry = function(id, country) {
    id = parseInt(id)
    const index =  _getCountryIndexById(id);
    if (index < 0) {
        throw new Error(`Country with id ${id} does not exist`)
    }
    countries[index] = { ...country, id }
    return countries
}

export const postCountry = function(countryData) {
    const newId = (countries[countries.length-1]?.id || 0 ) + 1
    countries.push({...countryData, id: newId})
    return countries;
}