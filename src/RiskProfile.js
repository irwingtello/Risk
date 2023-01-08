import React, { useState } from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
function TokenForm() {
  const [tokens, setTokens] = useState([{ name: "", num: "" }]);
  const [email, setEmail] = useState("");

  const handleChange = (e, index) => {
    const values = [...tokens];
    if (e.target.name === "name") {
      values[index].name = e.target.value;
    } else if (e.target.name === "num") {
      values[index].num = e.target.value;
    } else {
      setEmail(e.target.value);
    }
    setTokens(values);
  }

  const addToken = () => {
    setTokens([...tokens, { name: "", num: "" }]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
        tokens: tokens.reduce((obj, value, index) => ({ ...obj, [`Token ${index}`]: value }), {}),
        email:email,
        status:"Unsolved",
      };
    const db = firebase.firestore();
    db.collection("riskScore")
    .add(data)
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      setTokens([{ name: "", num: "" }]);
      setEmail("");
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
    alert("Done ,You will shortly receive your risk profile.")
  }
  const removeTextbox = (index) => {
    const values = [...tokens];
    values.splice(index, 1);
    setTokens(values);
  }
  return (
    <form onSubmit={handleSubmit}>
      {
        tokens.map((token, index) => (
          <div key={index}>
            <label>
              Token Name:
              <input
                type="text"
                name="name"
                value={token.name}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
            <br></br>
            <label>
              Number of Tokens:
              <input
                type="number"
                name="num"
                value={token.num}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
            <button type="button" onClick={() => removeTextbox(index)}>Remove</button>

          </div>
        ))
      }
      <button type="button" onClick={addToken}>Add Token</button>
      <br></br>
      <br></br>
      <label>
        Email:
        <input
          type="email"
          name="Email"
          value={email}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default TokenForm;