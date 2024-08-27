// import { init } from "next/dist/compiled/webpack/webpack";
import { useEffect, useState } from "react";

export const useQueryState = (key, initialValue) => {
  const [queryState, setQueryState] = useState(initialValue);

  useEffect(() => {
    const newURL = new URL(window.location);
    const params = newURL.searchParams;
    console.log("params", params);

    if (!queryState) {
      params.delete(key);
    } else {
      params.set(key, queryState);
    }

    window.history.replaceState(null, "", newURL.toString());
    console.log("newURL", newURL);
  }, [key, queryState]);

  return [queryState, setQueryState];
};
