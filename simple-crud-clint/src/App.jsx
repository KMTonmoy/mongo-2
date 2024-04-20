import React from 'react';
import './App.css';

const App = () => {
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const user = { name, email };

    console.log(user);

    fetch('http://localhost:5000/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      
  };

  return (
    <div>
      <h1>Simple CRUD</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" /><br />
        <input type="email" name="email" /><br />
        <input type="submit" value="Add User" /><br />
      </form>
    </div>
  );
};

export default App;
