import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonDetailsPopup from './PokemonDetailsPopup';
const PokedexApp = () => {
  
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        const results = response.data.results;

        const pokemonDetails = await Promise.all(
          results.map(async (pokemon) => {
            const detailsResponse = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              image: detailsResponse.data.sprites.other.dream_world.front_default,
              details: detailsResponse.data,
            };
          })
        );
        console.log(pokemonDetails)

        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemonList();
  }, []);


  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="p-4">
      
      <h1 className="text-3xl font-bold mb-4">Pokedex</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Pokemon"
          className="p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredPokemon.map((pokemon) => (
      
        <li
          key={pokemon.name}
          className={`bg-gray-200 p-4 rounded-md cursor-pointer ${
            selectedPokemon && selectedPokemon.name === pokemon.name
              ? 'border border-green-500'
              : ''
          }`}
         
          onClick={() => handlePokemonClick(pokemon)}
        >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="mx-auto mb-2"
              style={{ maxWidth: '96px' }}
            />
            <div className="text-center">{pokemon.name}</div>
          </li>
        ))}
      </ul>
      {selectedPokemon && isPopupOpen && (
        <PokemonDetailsPopup
          selectedPokemon={selectedPokemon}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};  


export default PokedexApp;
