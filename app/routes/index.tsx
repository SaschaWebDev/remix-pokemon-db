import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";

import pokemon, { Pokemon } from "../../lib/pokemon";

export let loader: LoaderFunction = () => {
  return pokemon.slice(0, 10);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Pokemon DB",
    description: "Pokemon DB!",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<Pokemon[]>();

  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {data.map((p) => (
          <li key={p.id} className="relative">
            <Link to={`/pokemon/${p.name}`}>
              <div className="hover:scale-110 transition duration-200 group block w-full aspect-w-10 aspect-h-8 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <img
                  src={`/pokemon/${p.name.toLowerCase()}.jpg`}
                  alt=""
                  className="object-cover pointer-events-none group-hover:opacity-75"
                />
              </div>
              <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                {p.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
