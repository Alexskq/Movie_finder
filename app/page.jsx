"use client";

import Image from "next/image";
import { useState } from "react";
import { useQueryState } from "./useQueryState";
import { useDebounceValue } from "./useDebounceValue";
import { useApiKeyRequired } from "./useApiKeyRequired";
import { useMovieQuery } from "./useMovieQuery";

export default function Home() {
  const [query, setQuery] = useQueryState("s", "");
  const debouncedValue = useDebounceValue(query, 1000);
  const { data, error, isLoading } = useMovieQuery(debouncedValue);
  useApiKeyRequired();

  return (
    <div className="flex flex-col gap-4 py-8 max-w-4xl m-auto px-4">
      <header>
        <h1 className="text-4xl font-bold text-center">MovieFinder</h1>
        <fieldset className="border border-neutral p-4 rounded-lg">
          <legend className="text-lg font-semibold">Search</legend>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          {/* <p>{movieQuery}</p> */}
        </fieldset>
      </header>

      <main className="flex justify-center items-center">
        {error ? <p>Error : {error.message}</p> : null}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-hidden">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4 ">
                  <div className="skeleton w-full h-full object-cover rounded-md shadow aspect-ratio-[2/3]" />
                  <div>
                    <p className="skeleton text-sm font-medium h-5 w-1/2 "></p>
                    <p className="skeleton text-sm text-neutral-content font-medium h-4 w-1/3"></p>
                  </div>
                </div>
              ))
            : null}

          {data?.Search?.length > 0
            ? data.Search.map((movie) => (
                <div key={movie.imdbID} className="flex flex-col gap-4">
                  <img
                    src={movie.Poster}
                    alt={`${movie.Title}'s poster`}
                    className="w-full h-full object-cover rounded-md shadow aspect-ratio-[2/3]"
                  />
                  <div>
                    <p className="text-sm font-medium">{movie.Title}</p>
                    <p className="text-sm text-neutral-content font-medium">
                      {movie.Year} | {movie.Type}
                    </p>
                  </div>
                </div>
              ))
            : null}
        </div>
      </main>
    </div>
  );
}
