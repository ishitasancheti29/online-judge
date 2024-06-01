import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Users.css";

const Users = () => {
  const [problems, setProblems] = useState([]);
  const [newProblem, setNewProblem] = useState({ problem: "", Description: "" });

  // Fetch problems from the server
  const fetchProblems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Users');
      setProblems(response.data);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  // Fetch problems on component mount
  useEffect(() => {
    fetchProblems();
  }, []);

  // Handle input changes for the new problem form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProblem({ ...newProblem, [name]: value });
  };

  // Handle adding a new problem
  const handleAddProblem = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post('http://localhost:5000/Users', newProblem);
      setProblems([...problems, response.data]); // Add new problem to the state
      setNewProblem({ problem: "", Description: "" }); // Reset the form
    } catch (error) {
      console.error("Error adding problem:", error);
    }
  };

  // Handle deleting a problem
  const handleDeleteProblem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/Users/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (error) {
      console.error("Error deleting problem:", error);
    }
  };

  return (
    <div className="users-container">
      <h1>Problems</h1>
      <table className="problems-table">
        <thead>
          <tr>
            <th>Problem Name</th>
            <th>Problem Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem._id}>
              <td>{problem.problem}</td>
              <td>{problem.Description}</td>
              <td>
                <button className="delete-button" onClick={() => handleDeleteProblem(problem._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Problem</h2>
      <form className="new-problem-form" onSubmit={handleAddProblem}>
        <input
          type="text"
          name="problem"
          placeholder="Problem Name"
          value={newProblem.problem}
          onChange={handleInputChange}
          className="input-field"
          required
        />
        <input
          type="text"
          name="Description"
          placeholder="Problem Description"
          value={newProblem.Description}
          onChange={handleInputChange}
          className="input-field"
          required
        />
        <button type="submit" className="add-button">Add Problem</button>
      </form>
    </div>
  );
};

export default Users;
