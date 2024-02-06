// PokemonDetailsPopup.js
import React from 'react';
import './pokemonDetailsPopup.css';

const PokemonDetailsPopup = ({ selectedPokemon, onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2 className="text-xl font-bold mb-2">{selectedPokemon.name}</h2>
        <div>
           <img
              src={selectedPokemon.image}
              alt={selectedPokemon.name}
              className="mx-auto mb-2"
              style={{ maxWidth: '96px' }}
            />
          <strong>Height:</strong> {selectedPokemon.details.height}
        </div>
        <div>
          <strong>Weight:</strong> {selectedPokemon.details.weight}
        </div>
        {/* Add more details as needed */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PokemonDetailsPopup;
