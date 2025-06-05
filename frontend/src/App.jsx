import { useState } from "react";
import "./App.css";

function App() {
  const [apiKey, setApiKey] = useState("");

  return (
    <>
      <h1>IntelGrid</h1>
      <label htmlFor="api-key-input">Enter your Limited Access API Key: </label>
      <input
        id="api-key-input"
        type="text"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Your API Key"
      />
    </>
  );
}

export default App;
