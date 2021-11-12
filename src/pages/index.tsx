import type { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "react-query";
import Head from "next/head";

import styles from "../styles/Home.module.css";

import CardGrid from "../components/CardGrid";

type FetchProps = {
  offSet: number;
  page: number | string;
};

const Home: NextPage = () => {
  const [pageCount, setPageCount] = useState(0);

  const next = () => {
    setPageCount((current) => current + 1);
  };

  const prev = () => {
    setPageCount((current) => current - 1);
  };

  const fetchPage = async ({ offSet, page }: FetchProps) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${
        Number(page) * offSet
      }&limit=${offSet}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { isLoading, data } = useQuery(
    ["page", pageCount],
    ({ queryKey }) => fetchPage({ offSet: 16, page: queryKey[1] }),
    {
      keepPreviousData: true,
    }
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={prev}>Previous </button>
        <button onClick={next}>Next</button>
      </div>
      {!isLoading && <CardGrid pokemonData={data.results} />}
    </div>
  );
};

export default Home;
