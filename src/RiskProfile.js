import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import InputLabel from "@mui/material/InputLabel";
import "./Risk.css";
import { validate } from "uuid";
function TokenForm() {
  const [tokens, setTokens] = useState([{ name: "", num: "" }]);
  const [email, setEmail] = useState("");

  const handleChange = (e, index) => {
    const values = [...tokens];
    let strongRegex = new RegExp("^[A-Za-z ]*$");
    let strongRegex1 = new RegExp("^[0-9.]*$");
    if (e.target.name === "num" && strongRegex1.test(e.target.value) == false)
      return false;
    if (e.target.name === "name" && strongRegex.test(e.target.value) == false)
      return false;
    if (e.target.name === "name") {
      values[index].name = e.target.value;
    } else if (e.target.name === "num") {
      values[index].num = e.target.value;
    } else {
      setEmail(e.target.value);
    }

    setTokens(values);
  };

  const addToken = () => {
    setTokens([...tokens, { name: "", num: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let rowValidation = false;
    let strongRegex = new RegExp("^(.+)@(\\S+)*$");

    tokens.forEach((token) => {
      if (token.name.length === 0 || token.num.length === 0) {
        rowValidation = true;
      }
    });

    if (email.length === 0) {
      alert("Email cannot be empty.");
    } else {
      if (!strongRegex.test(email)) {
        alert("Email contains invalid characters.");
      } else {
        if (rowValidation === false) {
          const data = {
            tokens: tokens.reduce(
              (obj, value, index) => ({ ...obj, [`Token ${index}`]: value }),
              {}
            ),
            email: email,
            status: "Unsolved",
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
          alert("Done ,You will shortly receive your risk profile.");
        } else {
          alert("Name and number of tokens fields cannot be empty.");
        }
      }
    }
  };
  const removeTextbox = (index) => {
    const values = [...tokens];
    values.splice(index, 1);
    setTokens(values);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="div-buttons">
        {tokens.map((token, index) => (
          <div key={index}>
            <label>
              token name:
              <input
                className="input"
                type="text"
                name="name"
                value={token.name}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
            <br></br>
            <label>
              number of tokens:
              <input
                className="input"
                name="num"
                value={token.num}
                onChange={(e) => handleChange(e, index)}
              />
            </label>

            <button
              type="button"
              onClick={() => removeTextbox(index)}
              className="buttonremove button2 "
            >
              remove token
            </button>
          </div>
        ))}

        <button type="button" onClick={addToken} className="buttonadd button2 ">
          add token
        </button>
      </div>

      <label>
        email:
        <input
          className="input"
          name="Email"
          value={email}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="buttonSubmit button2">
        give me my risk report!
      </button>
    </form>
  );
}

export default TokenForm;
