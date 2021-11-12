import React from "react";
import { useRouter } from "next/dist/client/router";

const PokemonDetailsPage = () => {
  const router: any = useRouter();
  const { name } = router.query;

  console.log("name", name);

  return (
    <div className="container">
      <h1>Details goes here</h1>
    </div>
  );
};

export default PokemonDetailsPage;
