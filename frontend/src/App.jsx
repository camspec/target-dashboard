import { useState, useEffect } from "react";
import "./App.css";
import TargetDashboard from "./TargetDashboard.jsx";
import { createUser } from "./api.js";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(apiKey);
      localStorage.setItem("tornApiKey", apiKey);
      setSubmittedKey(apiKey);
    } catch (err) {
      console.error(err);
      alert("Failed to register API key: " + err.message);
    }
  };

  return (
    <>
      <h1>IntelGrid</h1>
      {!submittedKey ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="api-key-input">
            Enter your <span style={{ color: "#fcc419" }}>Limited Access</span>{" "}
            API Key:
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
      ) : (
        <TargetDashboard apiKey={submittedKey} />
      )}
    </>
  );
}

export default App;
