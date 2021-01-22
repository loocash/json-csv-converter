import { Converter } from "./components/Converter";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h2>JSON ⥊ CSV Converter</h2>
      <Converter
        initialJson={`[{"Year":"1997","Make":"Ford","Model":"E350"},
{"Year":"2000","Make":"Mercury","Model":"Cougar"}]`}
      />
    </div>
  );
}

export default App;
