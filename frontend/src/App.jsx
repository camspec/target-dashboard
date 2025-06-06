import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [apiKey, setApiKey] = useState("");
  const [submittedKey, setSubmittedKey] = useState("");

  useEffect(() => {
    const savedKey = localStorage.getItem("tornApiKey");
    if (savedKey) {
      setApiKey(savedKey);
      setSubmittedKey(savedKey);
    }
  }, []);

  const handleChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("tornApiKey", apiKey);
    setSubmittedKey(apiKey);
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
          autoComplete="new-password"
        />
        <button type="submit">Submit</button>
      </form>
      {submittedKey && (
        <p>API key saved: <code>{submittedKey}</code></p>
      )}
    </>
  );
}

export default App;
