import { debounce } from "@/utils";
import { fetchData } from "@/utils/data";
import { useEffect, useState } from "react";

type AutocompleteProps = {
  onSelect: (item: string) => void;
  placeholder?: string;
  minChars?: number;
};

export const Autocomplete: React.FC<AutocompleteProps> = ({
  onSelect,
  placeholder = "Start typing...",
  minChars = 2,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length < minChars) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const debouncedFetchData = debounce(async () => {
      setIsLoading(true);

      try {
        const results = await fetchData(query);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    const timeoutId = debouncedFetchData();

    return () => clearTimeout(timeoutId);
  }, [minChars, query]);

  const handleSelect = (item: string) => {
    setQuery(item);
    onSelect(item);
    setShowSuggestions(false);
  };

  return (
    <div className="w-64 relative">
      <input
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (query.length >= minChars) {
            setShowSuggestions(true);
          }
        }}
        onFocus={() => query.length >= minChars && setShowSuggestions(true)}
        className="border border-gray-300 rounded-md px-2 py-1 w-full"
      />

      {isLoading && (
        <div className="absolute top-10 left-0 right-0 flex justify-center items-center h-10 bg-white rounded-md border shadow-sm text-sm">
          Loading...
        </div>
      )}

      {!isLoading && showSuggestions && suggestions.length > 0 && (
        <ul className="flex flex-col absolute top-10 left-0 right-0 rounded-md overflow-hidden border shadow-sm">
          {suggestions.map((item) => (
            <li
              key={item}
              className="bg-white cursor-pointer px-2 py-1 w-full hover:bg-gray-100"
              onClick={() => handleSelect(item)}
            >
              {item}, {query}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
