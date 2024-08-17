// src/PasswordGenerator.js
import React, { useState } from "react";
import "./PasswordGenerator.scss";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [error, setError] = useState("");

  const handleCheckboxChange = (type) => {
    const setState = {
      lowercase: setIncludeLowercase,
      uppercase: setIncludeUppercase,
      numbers: setIncludeNumbers,
      symbols: setIncludeSymbols,
    }[type];

    setState((prev) => {
      const newState = !prev;
      const newValues = {
        includeLowercase: type === "lowercase" ? newState : includeLowercase,
        includeUppercase: type === "uppercase" ? newState : includeUppercase,
        includeNumbers: type === "numbers" ? newState : includeNumbers,
        includeSymbols: type === "symbols" ? newState : includeSymbols,
      };

      const anyChecked = Object.values(newValues).includes(true);
      if (!anyChecked) {
        setError("At least one option must be selected.");
        return prev;
      }

      setError("");
      return newState;
    });
  };

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    let characters = "";
    if (includeLowercase) characters += lowercase;
    if (includeUppercase) characters += uppercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    if (characters === "") {
      setError("Please select at least one character type.");
      return;
    }

    setError("");

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    if (password === "") {
      return;
    }

    navigator.clipboard
      .writeText(password)
      .then(() => {
        alert("Password copied to clipboard!");
      })
      .catch((err) => {
        alert("Failed to copy password: " + err);
      });
  };

  return (
    <div className="password-generator">
      <div className="password-container">
        <div className="password-field">
          <input
            type="text"
            value={password}
            readOnly
            className="password-input"
          />
          <button
            className="copy-button"
            onClick={copyToClipboard}
            disabled={password === ""}
          >
            Copy
          </button>
        </div>
      </div>

      <div>
        <label className="flex-column">
          <div>
          Character length
          <span>{length}</span>
          </div>
          <input
            type="range"
            min="6"
            max="15"
            step="1"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => handleCheckboxChange("lowercase")}
          />
          Include Lowercase
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => handleCheckboxChange("uppercase")}
          />
          Include Uppercase
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => handleCheckboxChange("numbers")}
          />
          Include Numbers
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => handleCheckboxChange("symbols")}
          />
          Include Symbols
        </label>
      </div>
      <button className="generate-button" onClick={generatePassword}>Generate</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default PasswordGenerator;
