import { useState } from "react";
import "./App.css";

function App() {
  const [apiKey, setApiKey] = useState("");

  const handleChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`API Key entered: ${apiKey}`);
  };

  return (
    <>
      <h1>IntelGrid</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="api-key-input">
          Enter your Limited Access API Key:{" "}
        </label>
        <input
          id="api-key-input"
          type="text"
          value={apiKey}
          onChange={handleChange}
          placeholder="Your API Key"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
