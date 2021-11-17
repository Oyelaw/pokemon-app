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
      <div className="container p-4">
        <div className="grid gap-4 justify-items-center xl:grid-cols-2">
          <div>
            <h2 className="text-gray-900 text-center">
              <span className="uppercase font-semibold">Name</span>:{" "}
              <span className="capitalize">{species.name}</span>
            </h2>
            <div className="flex justify-center">
              <Image
                alt="Picture of the pokemoon"
                src={sprites.front_default}
                width={300}
                height={300}
              />
            </div>

            <p className="text-gray-900 text-center">
              <span className="capitalize font-semibold">Species</span>:{" "}
              <span className="capitalize">{species.name}</span>
            </p>
            <p className="text-gray-900 text-center">
              <span className="capitalize font-semibold">Weight</span>: {weight}
            </p>

            <h2 className="text-gray-900 text-center font-semibold mt-4 uppercase">
              Types
            </h2>
            <div className="flex space-x-2 flex-wrap justify-center">
              {types.map((item: PokemonType) => {
                const { type } = item;
                return (
                  <p
                    className="text-gray-900 text-center capitalize"
                    key={type.name}
                  >
                    {type.name}
                  </p>
                );
              })}
            </div>

            <h2 className="text-gray-900 text-center font-semibold mt-4 mb-2 uppercase">
              Stats
            </h2>
            <div className="grid justify-items-center lg:grid-cols-3 gap-3">
              {stats.map((item: PokemonStat) => {
                const { base_stat, effort, stat } = item;
                return (
                  <div
                    className="w-48 bg-indigo-400 p-3 rounded-lg text-white"
                    key={stat.name}
                  >
                    <h3 className="text-center uppercase">{stat.name}</h3>
                    <p className="text-center">Base stat: {base_stat}</p>
                    <p className="text-center">Effort: {effort}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-gray-900 text-center font-semibold mb-2 uppercase">
              Moves
            </h2>
            <div className="grid justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-3 text-gray-900">
              {moves.map((item: PokemonMove) => {
                const { move } = item;
                return (
                  <p key={move.name} className="bg-gray-300 p-2 rounded-lg">
                    <span className="capitalize font-semibold">Name</span>:{" "}
                    <span className="capitalize">{move.name}</span>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="container">
      {status === "loading" ? <h2>loading..</h2> : <ShapeData data={data} />}
    </div>
  );
};

export default PokemonDetailsPage;
