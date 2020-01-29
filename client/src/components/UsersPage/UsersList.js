import React from "react";

export const UsersList = ({ users }) => {
  if (!users.length) {
    return <p className="center">No users yet.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>N°</th>
          <th>Username</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
