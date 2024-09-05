import useSWR from "swr";

export const useMovieQuery = (search) => {
  return useSWR(`movie-query-${search}`, async () => {
    if (search.length < 3) {
      throw new Error("Search query is too short");
    }

    const apiKey = localStorage.getItem("apikey");

    if (!apiKey) {
      throw new Error("API Key is required");
    }

    const url = new URL("https://www.omdbapi.com");
    url.searchParams.set("s", search);
    url.searchParams.set("apikey", apiKey);

    console.log("url", url.toString());

    const json = await fetch(url.toString()).then((res) => res.json());
    return json;
  });
};
