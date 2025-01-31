import React, { useState } from "react";
import "./Journal.css";


function Journal() {
  const [users, setUsers] = useState({}); // Store users and their journal entries
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");

  // Handle user login or registration
  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter a username and password.");
      return;
    }

    if (users[username]) {
      // If user exists, check password
      if (users[username].password === password) {
        setCurrentUser(username);
        setEntries(users[username].entries);
      } else {
        alert("Incorrect password!");
      }
    } else {
      // New user registration
      const newUser = { password, entries: [] };
      setUsers({ ...users, [username]: newUser });
      setCurrentUser(username);
      setEntries([]);
    }
  };

  // Logout function
  const handleLogout = () => {
    setCurrentUser(null);
    setUsername("");
    setPassword("");
    setEntries([]);
  };

  // Add a new journal entry
  const handleAddEntry = () => {
    if (newEntry.trim() !== "") {
      const updatedEntries = [
        ...entries,
        { id: Date.now(), text: newEntry, date: new Date().toLocaleString() },
      ];
      setEntries(updatedEntries);
      setUsers({
        ...users,
        [currentUser]: { ...users[currentUser], entries: updatedEntries },
      });
      setNewEntry("");
    }
  };

  // Delete an entry with confirmation
  const handleDeleteEntry = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this journal entry?");
    if (confirmDelete) {
      const updatedEntries = entries.filter((entry) => entry.id !== id);
      setEntries(updatedEntries);
      setUsers({
        ...users,
        [currentUser]: { ...users[currentUser], entries: updatedEntries },
      });
    }
  };

  // Update an entry
  const handleEditEntry = (id, updatedText) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === id ? { ...entry, text: updatedText } : entry
    );
    setEntries(updatedEntries);
    setUsers({
      ...users,
      [currentUser]: { ...users[currentUser], entries: updatedEntries },
    });
  };

  return (
    <div className="main">
      {!currentUser ? (
        <div>
          <h2>Login or Register to see your journal entries.</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button onClick={handleLogin}>Login / Register</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {currentUser}!</h2>
          <button onClick={handleLogout}>Log Out</button>

          <h3>Your Journal Entries</h3>
          <ul>
            {entries.map((entry) => (
              <li key={entry.id}>
                <strong>{entry.date}</strong>
                <textarea
                  value={entry.text}
                  onChange={(e) => handleEditEntry(entry.id, e.target.value)}
                />
                <button onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
              </li>
            ))}
          </ul>

          <h3>Add New Entry</h3>
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Write your journal entry..."
          />
          <button onClick={handleAddEntry}>Add Entry</button>
        </div>
      )}
    </div>
  );
}

export default Journal;
