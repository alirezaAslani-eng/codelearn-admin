import Fuse from "fuse.js";
import { useCallback, useMemo, useState } from "react";

export default function useFuseSearch(
  data = null,
  keys = null,
  threshold = 0.4
) {
  const [result, setResult] = useState([]);

  // config == >
  try {
    const fuse = useMemo(() => {
      return new Fuse(data, {
        keys,
        threshold,
        includeScore: true,
      });
    }, [keys, data]);
    // start search process == >
    const startSearch = useCallback(
      (searchValue) => {
        if (searchValue && searchValue?.trim()) {
          setResult(fuse.search(searchValue));
        } else {
          setResult([]);
        }
      },
      [fuse]
    );

    return { startSearch, result };
  } catch (err) {
    console.log(err);
    setResult([]);
    return { startSearch: () => {}, result: [] };
  }
}
