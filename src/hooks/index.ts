import { useQuery } from "react-query";

type FetchProps = {
  offSet: number;
  page: number;
};

// Move to constant file
const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const OFF_SET = 16;

const fetchPage = async ({ offSet, page }: FetchProps) => {
  const response = await fetch(
    `${BASE_URL}?offset=${page * offSet}&limit=${offSet}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useFetchPageHook = (page: number) => {
  const { isLoading, isError, data } = useQuery(
    ["page", page],
    ({ queryKey }) => fetchPage({ offSet: OFF_SET, page: Number(queryKey[1]) }),
    {
      keepPreviousData: true,
    }
  );

  return {
    isLoading,
    isError,
    data,
  };
};

const fetchPokemonDetails = async (name: string) => {
  const response = await fetch(`${BASE_URL}/${name}`);
  if (!response.ok) {
    console.log("Error", response);

    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useFetchPokemon = (name: string) => {
  const { data, status } = useQuery(
    ["pokemon", name],
    async ({ queryKey }) => {
      return await fetchPokemonDetails(queryKey[1]);
    },
    {
      staleTime: Infinity,
    }
  );

  return {
    data,
    status,
  };
};
