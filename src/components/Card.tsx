import React from "react";
import Image from "next/image";
import { useQuery } from "react-query";

type CardProp = {
  pokemon: { url: string; name: string };
};

const fetchPokemonObject = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function useFetchPokemon(pokemon: { url: string }) {
  return useQuery(
    ["pokemon", pokemon.url],
    async ({ queryKey }) => {
      return await fetchPokemonObject(queryKey[1]);
    },
    {
      staleTime: Infinity,
    }
  );
}

const Card = ({ pokemon }: CardProp) => {
  const { data, status } = useFetchPokemon(pokemon);
  return (
    <div className="card">
      {status === "loading" ? (
        <h2>Loading....</h2>
      ) : (
        <Image
          alt="Picture of the pokemoon"
          src={data.sprites.front_default}
          width={200}
          height={200}
        />
      )}
      <p>{pokemon.name}</p>
    </div>
  );
};

export default Card;
