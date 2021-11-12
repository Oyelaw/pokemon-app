import React from "react";

import Card from "./Card";

type Pokemon = {
  name: string;
  url: string;
};

type CardGridProps = {
  pokemonData: Pokemon[];
};

const CardGrid = ({ pokemonData }: CardGridProps) => {
  return (
    <div className="card-grid">
      {pokemonData.map((pokemon: Pokemon) => {
        return <Card pokemon={pokemon} key={pokemon.name} />;
      })}
    </div>
  );
};

export default CardGrid;
