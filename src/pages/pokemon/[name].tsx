import React from "react";
import { useRouter } from "next/dist/client/router";
import { useQuery } from "react-query";

const PokemonDetailsPage = () => {
  const router: any = useRouter();
  const { name } = router.query;

  const fetchPokemonDetails = async (name: RequestInfo) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      console.log("Error", response);

      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  function useFetchPokemon(name: string) {
    return useQuery(
      ["pokemon", name],
      async ({ queryKey }) => {
        return await fetchPokemonDetails(queryKey[1]);
      },
      {
        staleTime: Infinity,
      }
    );
  }

  const { data, status } = useFetchPokemon(name);

  return (
    <div className="container">
      {status === "loading" ? (
        <h4>loading..</h4>
      ) : (
        <div>
          <h1>{name}</h1>
          <p>Species: {data.species.name}</p>
          <p>Weight: {data.weight}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonDetailsPage;
