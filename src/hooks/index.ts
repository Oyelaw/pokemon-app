import { useQuery } from "react-query";

type FetchProps = {
  offSet: number;
  page: number;
};

const fetchPage = async ({ offSet, page }: FetchProps) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${page * offSet}&limit=${offSet}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useFetchPageHook = (page: number) => {
  const { isLoading, isError, data } = useQuery(
    ["page", page],
    ({ queryKey }) => fetchPage({ offSet: 16, page: Number(queryKey[1]) }),
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
