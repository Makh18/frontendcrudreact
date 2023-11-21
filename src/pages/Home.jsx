import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import Search from "../users/Search";

export default function Home() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        loadUsers();
      }, []);
    
      const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/users");
        setUsers(result.data);
        console.log(result.data);
      };
      const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/user/${id}`);
        loadUsers();
      };
    
  return (
    <div className="container">
       <Search
				search={search}
				setSearch={setSearch}
			/>
<div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">U.N</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {users.filter((st) =>
							st.name
								.toLowerCase()
								.includes(search)
						)
          .map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.name}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${user.id}`}
                    
                  >
                    <FiEye  style={{marginBottom:"6"}} />

                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    <FiEdit  style={{marginBottom:"6"}}/>

                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    <FiTrash2 style={{marginBottom:"6"}}/>

                    Delete
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}