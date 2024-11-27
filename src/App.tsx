import { Autocomplete } from "./components/auto-complete";

const App = () => {
  return (
    <main className="grid place-content-center my-48">
      <Autocomplete onSelect={console.log} />
    </main>
  );
};

export default App;
