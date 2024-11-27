import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { debounce } from "@/utils";
import { fetchData } from "@/utils/data";

type AutocompleteProps = {
  minChars?: number;
  placeholder?: string;
  value?: string;
  onSelect: (item: string) => void;
};

export const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  onSelect,
  minChars = 2,
  placeholder = "Start typing...",
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const containerRef = useClickOutside(useCallback(() => setShowSuggestions(false), []));
  const inputRef = useRef<HTMLInputElement | null>(null);

  const listId = useId();
  const listOptionsPrefixId = useId();

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
    setSelectedIndex(-1);

    inputRef.current?.blur();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      return;
    }

    if (event.key === "Enter") {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelect(suggestions[selectedIndex]);
      }
      return;
    }

    if (event.key === "Escape") {
      setShowSuggestions(false);
      setSelectedIndex(-1);
      return;
    }
  };

  return (
    <div ref={containerRef} className="w-64 relative">
      <input
        ref={inputRef}
        placeholder={placeholder}
        value={query}
        disabled={!!value}
        className="border border-gray-300 rounded-md px-2 py-1 w-full disabled:bg-gray-100"
        onKeyDown={handleKeyDown}
        onFocus={() => query.length >= minChars && setShowSuggestions(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          if (query.length >= minChars) {
            setShowSuggestions(true);
          }
        }}
        aria-label="Search"
        aria-expanded={showSuggestions}
        aria-controls={listId}
        aria-activedescendant={
          selectedIndex >= 0 ? `${listOptionsPrefixId}-suggestion-${selectedIndex}` : undefined
        }
      />

      {value && (
        <button
          className="text-xs hover:underline text-end w-full"
          onClick={() => {
            setQuery(value);
            onSelect("");

            // let the disable prop take effect before focusing
            setTimeout(() => inputRef.current?.focus(), 0);
          }}
        >
          clear selection
        </button>
      )}

      {!value && isLoading && showSuggestions && (
        <div className="absolute top-10 left-0 right-0 flex justify-center items-center h-10 bg-white rounded-md border shadow-sm text-sm">
          Loading...
        </div>
      )}

      {!value && !isLoading && showSuggestions && suggestions.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="flex flex-col absolute top-10 left-0 right-0 rounded-md overflow-hidden border shadow-sm"
        >
          {suggestions.map((item, index) => (
            <li
              key={item}
              id={`${listOptionsPrefixId}-suggestion-${index}`}
              role="option"
              aria-selected={selectedIndex === index}
              className="bg-white cursor-pointer px-2 py-1 w-full aria-selected:bg-gray-100"
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {item}, {query}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
