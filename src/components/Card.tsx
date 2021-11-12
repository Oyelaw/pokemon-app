import React from "react";

type CardProp = {
  pokemon: { url: string; name: string };
};

const Card = ({ pokemon }: CardProp) => {
  return (
    <div className="card">
      <p>Pokemon Image</p>
      <p>{pokemon.name}</p>
    </div>
  );
};

export default Card;
