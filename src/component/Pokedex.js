import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonDetailsPopup from "./PokemonDetailsPopup";

const PokedexApp = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('All')
 

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
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        const results = response.data.results;
        console.log(results)

        const pokemonDetails = await Promise.all(
          results.map(async (pokemon) => {
            const detailsResponse = await axios.get(pokemon.url);
            const types = detailsResponse.data.types.map((type) => type.type.name);
            console.log("types",types);
            return {
              name: pokemon.name,
              image: detailsResponse.data.sprites.other.dream_world.front_default,
              type: types[0],
              details: detailsResponse.data,
            };
        
          })
        );
        console.log(pokemonDetails);
        console.log(pokemonDetails.type);

        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
      }
    };

    fetchPokemonList();
  }, []);

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const pokemonTypes = ['All', 'Fire', 'Water', 'Rock', 'Grass', 'Ground'];

  const filteredPokemon = pokemonList.filter((pokemon) => {
    if(selectedType === 'All'){
   return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    }else if(selectedType === 'Fire'){
      return (
        pokemon.type.toLowerCase().includes(selectedType.toLowerCase())
      )}
      else if(selectedType === 'Water'){
     return (
        pokemon.type.toLowerCase().includes(selectedType.toLowerCase())
      )
      }
      else if(selectedType === 'Grass'){
     return (
        pokemon.type.toLowerCase().includes(selectedType.toLowerCase())
      )
      }
      else if(selectedType === 'Ground'){
     return (
        pokemon.type.toLowerCase().includes(selectedType.toLowerCase())
      )
      }
      else if(selectedType === 'Rock'){
     return (
        pokemon.type.toLowerCase().includes(selectedType.toLowerCase())
      )
      }
      else if(selectedType === 'Bug'){
     return (
        pokemon.type.toLowerCase().includes(selectedType.toLowerCase())
      )
      }
});


  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Pokedex</h1>
      <div className="flex gap-x-4 mb-4">
        <div>
          <input
            type="text"
            placeholder="Search Pokemon"
            className="p-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="typeFilter" className="mr-2">
          Filter by Type:
        </label>
        <select
          id="typeFilter"
          className="p-2 border border-gray-300 rounded-md"
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          {pokemonTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemon.map((pokemon) => (
          
          <li
            key={pokemon.name}
            className={`bg-gray-200 p-4 rounded-md cursor-pointer ${
              selectedPokemon && selectedPokemon.name === pokemon.name
                ? "border border-green-500"
                : ""
            }`}
            onClick={() => handlePokemonClick(pokemon)}
            
          >
          
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="mx-auto mb-2 hover:scale-125 transform transition duration-800 h-[96px]  w-[96px]"
              style={{ maxWidth: "96px" }}
              />
              
              
            <div className="text-center">{pokemon.name}</div>
          </li>
       
        )
        
        )}
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
