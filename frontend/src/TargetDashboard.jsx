import { useState, useEffect } from "react";
import { addTarget, fetchTargets, deleteTarget } from "./api.js";

function TargetDashboard({ apiKey }) {
  const [targets, setTargets] = useState([]);
  const [newId, setNewId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTargets();
  }, [apiKey]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addTarget(apiKey, newId);
      setNewId("");
      loadTargets();
    } catch (err) {
      setError(err.message);
    }
  };

  const loadTargets = async () => {
    try {
      const data = await fetchTargets(apiKey);
      setTargets(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTarget(apiKey, id);
      loadTargets();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h2>Your Targets</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {targets.map((target) => (
          <li key={target.target_id}>
            {target.target_id}
            <button onClick={() => handleDelete(target.target_id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="New Target ID"
          value={newId}
          onChange={(e) => setNewId(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default TargetDashboard;
