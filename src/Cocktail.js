import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cocktail = () => {
    const [cocktail, setCocktail] = useState(null);
    const [search, setSearch] = useState('');


    useEffect(() => {
        fetchRandomCocktail();
    }, []);
    
    //Funktio random cocktailille
    const fetchRandomCocktail = async () => {  
        try {
            const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
            setCocktail(response.data.drinks[0]);
        } catch (error) {
            console.error('Error fetching the random cocktail:', error);
        }
    };

    // Funktio hakemiselle nimen mukaan
    const handleSearch = async (e) => {
        e.preventDefault();
        if (search.trim() === '') return; 

        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
            const result = response.data.drinks ? response.data.drinks[0] : null;
            setCocktail(result);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Cocktail of the Day</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by cocktail name"
                />
                <button type="submit">Search</button>
            </form>
            <button onClick={fetchRandomCocktail} style={{ marginTop: '10px' }}>
                Get Random Cocktail
            </button>
            {cocktail ? (
                <div>
                    <h2>{cocktail.strDrink}</h2>
                    <p><strong>Glass:</strong> {cocktail.strGlass}</p>
                    <p><strong>Instructions:</strong> {cocktail.strInstructions}</p>
                    <p><strong>Ingredients</strong></p>
                        {Object.keys(cocktail)
                            .filter(key => key.startsWith('strIngredient') && cocktail[key])
                            .map(key => (
                                <li key={key}>{cocktail[key]}</li>
                            ))}
                </div>
            ) : null}
        </div>
    );
};

export default Cocktail;
