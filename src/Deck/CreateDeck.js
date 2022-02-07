import React, { useState } from "react";
import { createDeck } from "../utils/api/index";
import { useHistory, Link } from "react-router-dom";

function CreateDeck() {
  const [deck, setDeck] = useState({ name: "", description: "" });
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await createDeck(deck);

    history.push(`/decks/${response.id}`);
  }

  function changeHandler(event) {
    setDeck({ ...deck, [event.target.name]: event.target.value });
  }

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Create Deck</legend>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Deck Name"
              value={deck.name}
              onChange={changeHandler}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              id="description"
              type="text"
              name="description"
              placeholder="Brief description of the deck"
              value={deck.description}
              onChange={changeHandler}
              className="form-control"
            ></textarea>
          </div>
          <div className="d-flex bd-highlight mb-3">
            <div className="p-2 bd-highlight">
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
            <div className="p-2 bd-highlight">
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default CreateDeck;
