import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

import { useFetchPokemon } from "../../hooks/index";

type PokemonMove = {
  move: { name: string; url: string };
  version_group_detials: [];
};

type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
};

type PokemonType = {
  slot: number;
  type: { name: string; url: string };
};

type DataType = {
  data: {
    species: { name: string; url: string };
    weight: number;
    types: PokemonType[];
    stats: PokemonStat[];
    moves: PokemonMove[];
    sprites: { front_default: string };
  };
};

const PokemonDetailsPage: NextPage = () => {
  // Define proper type for router
  const router: any = useRouter();
  const { name } = router.query;

  const { data, status } = useFetchPokemon(name);

  const ShapeData = ({ data }: DataType) => {
    const { weight, species, types, stats, moves, sprites } = data;

    return (
      <>
        <div className="container">
          <p>
            <b>Name</b>: {species.name}
          </p>
          <Image
            alt="Picture of the pokemoon"
            src={sprites.front_default}
            width={300}
            height={300}
          />
          <p>
            <b>Species</b>: {species.name}
          </p>
          <p>
            <b>Weight</b>: {weight}
          </p>

          <h2>Types</h2>
          <div className="types">
            {types.map((item: PokemonType) => {
              const { type } = item;
              return <p key={type.name}>{type.name}</p>;
            })}
          </div>

          <h2>Stats</h2>
          <div className="width-100">
            {stats.map((item: PokemonStat) => {
              const { base_stat, effort, stat } = item;
              return (
                <div className="stat" key={stat.name}>
                  <h3>{stat.name}</h3>
                  <p>Base stat: {base_stat}</p>
                  <p>Effort: {effort}</p>
                </div>
              );
            })}
          </div>

          <h2>Moves</h2>
          <div className="moves-grid">
            {moves.map((item: PokemonMove) => {
              const { move } = item;
              return (
                <p key={move.name}>
                  <b>Name</b>: {move.name}
                </p>
              );
            })}
          </div>
        </div>
        <style jsx>{`
          .moves-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            background-color: violet;
            width: 100%;
            padding: 10px;
          }

          .width-100 {
            width: 100%;
          }

          .types {
            width: 100%;
            justify-content: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
          }

          .stat {
            background-color: whitesmoke;
            padding: 10px;
            margin: 10px 0;
          }

          @media (max-width: 320px) {
            .moves-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </>
    );
  };
  return (
    <div className="container">
      {status === "loading" ? <h2>loading..</h2> : <ShapeData data={data} />}
    </div>
  );
};

export default PokemonDetailsPage;
