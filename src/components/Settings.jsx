import React, { useState } from 'react';
import './Settings.css';

function Settings({ onGenerate }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [formData, setFormData] = useState({
    trivia_amount: 10,
    trivia_category: 'any',
    trivia_difficulty: 'any',
    trivia_type: 'any',
    trivia_encode: 'default',
  });

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData); // Pass the form data to the parent component
    setMenuVisible(false); // Hide the menu after submission
  };

  return (
    <div>
      <button className="burger-menu" onClick={toggleMenu}>
        ☰
      </button>

      {menuVisible && (
        <div className="settings-menu">
          <form onSubmit={handleSubmit} className="form-api">
            <h2 className="form-signin-heading">API Helper</h2>

            <label htmlFor="trivia_amount">Number of Questions:</label>
            <input
              type="number"
              name="trivia_amount"
              id="trivia_amount"
              className="form-control"
              min="1"
              max="50"
              value={formData.trivia_amount}
              onChange={handleChange}
            />

            <label htmlFor="trivia_category">Select Category: </label>
            <select
              name="trivia_category"
              className="form-control"
              value={formData.trivia_category}
              onChange={handleChange}
            >
              <option value="any">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals & Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science & Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime & Manga</option>
              <option value="32">Entertainment: Cartoon & Animations</option>
            </select>

            <label htmlFor="trivia_difficulty">Select Difficulty: </label>
            <select
              name="trivia_difficulty"
              className="form-control"
              value={formData.trivia_difficulty}
              onChange={handleChange}
            >
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <label htmlFor="trivia_type">Select Type: </label>
            <select
              name="trivia_type"
              className="form-control"
              value={formData.trivia_type}
              onChange={handleChange}
            >
              <option value="any">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>

            <label htmlFor="trivia_encode">Select Encoding: </label>
            <select
              name="trivia_encode"
              className="form-control"
              value={formData.trivia_encode}
              onChange={handleChange}
            >
              <option value="default">Default Encoding</option>
              <option value="urlLegacy">Legacy URL Encoding</option>
              <option value="url3986">URL Encoding (RFC 3986)</option>
              <option value="base64">Base64 Encoding</option>
            </select>

            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Generate
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Settings;
