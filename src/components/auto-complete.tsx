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
    (() => {
      if (query.length >= minChars) {
        setIsLoading(true);
        try {
          const data = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    })();
  }, [minChars, query]);

  const handleSelect = (item: string) => {
    setQuery(item);
    onSelect(item);
    setShowSuggestions(false);
  };

  console.log({
    showSuggestions,
  });

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

      {isLoading && <div>Loading...</div>}

      {showSuggestions && suggestions.length > 0 && (
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
