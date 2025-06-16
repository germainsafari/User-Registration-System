import React from "react";

function UsersList({ users }) {
  if (!users.length) return <p>No users registered yet.</p>;
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>
          <b>{u.name}</b> &lt;{u.email}&gt; <i>({new Date(u.registered_at).toLocaleString()})</i>
        </li>
      ))}
    </ul>
  );
}

export default UsersList; 