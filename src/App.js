import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

export default function App() {
  const [fetchDetails, setFetchDetails] = useState({
    loading: false,
    users: [],
    total: 0
  });
   const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
   const [total, setTotal] = useState(0);

  async function getTodos() {
    let res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: "GET"
    });
    let data = await res.json();
    setFetchDetails({
      loading: false,
      users: data,
      total: data.length
    });
        setLoading(false);
        setUsers(data);
        setTotal(data.length);
    //Uncomment to force batch updates
    // ReactDOM.unstable_batchedUpdates(() => {
    //   setLoading(false);
    //   setUsers(data);
    //   setTotal(data.length);
    // });
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <div className="add" onClick={getTodos}>Refetch</div>
      {console.log(
        `Rendering with values Loading : ${fetchDetails.loading} and users : ${
          fetchDetails.total > 0 ? "loaded" : "fetching"
        } and total : ${fetchDetails.total}`
      )}
      {fetchDetails.loading ? (
        <div>Loading....</div>
      ) : (
        <UsersList users={fetchDetails.users} />
      )}
      <div style={{ marginTop: "2rem", fontWeight: "bold" }}>
        Total Users : {fetchDetails.total}
      </div>
    </div>
  );
}

function UsersList({ users }) {
  return (
    <table cellPadding="5">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Website</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.website}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
