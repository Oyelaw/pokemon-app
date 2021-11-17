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
    <div className="grid gap-4 justify-items-center mt-5 md:grid-cols-2 lg:grid-cols-4">
      {pokemonData.map((pokemon: Pokemon) => {
        return <Card pokemon={pokemon} key={pokemon.name} />;
      })}
    </div>
  );
};

export default CardGrid;
