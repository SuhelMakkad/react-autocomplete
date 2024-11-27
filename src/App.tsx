import { useState } from "react";
import { Autocomplete } from "./components/auto-complete";

const App = () => {
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <main className="grid place-content-center mt-48">
      <div className="flex flex-col gap-1">
        <span className="text-sm">City search</span>
        <Autocomplete value={selectedCity} onSelect={setSelectedCity} />
      </div>

      {!!selectedCity && (
        <div className="mt-8 text-center">
          <hr className="mb-2" />
          <span className="text-xs">Selected city: {selectedCity}</span>
        </div>
      )}
    </main>
  );
};

export default App;
