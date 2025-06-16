import React, { useState, useEffect } from "react";
import RegistrationForm from "./components/RegistrationForm";
import UsersList from "./components/UsersList";
import { getUsers } from "./api";

function App() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => setUsers([]));
  }, [refresh]);

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", fontFamily: "Arial" }}>
      <h2>User Registration</h2>
      <RegistrationForm onRegistered={() => setRefresh((r) => !r)} />
      <hr />
      <h3>Registered Users</h3>
      <UsersList users={users} />
    </div>
  );
}

export default App; 