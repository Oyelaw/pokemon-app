import React from "react";
import Image from "next/image";
import Link from "next/link";
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
    <Link href={`/pokemon/${pokemon.name}`} passHref>
      <div className="bg-white w-60 rounded-md items-center py-3 flex flex-col hover:bg-gray-200 hover:-translate-y-0.5 transform transition cursor-pointer">
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
        <p className="text-gray-900 text-center uppercase">{pokemon.name}</p>
      </div>
    </Link>
  );
};

export default Card;
