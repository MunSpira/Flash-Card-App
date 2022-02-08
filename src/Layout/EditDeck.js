import React, { useEffect, useState } from "react";
import { readDeck, updateDeck } from "../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";

function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "", description: "" });
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await updateDeck(deck);

    history.push(`/decks/${response.id}`);
  }

  function changeHandler(event) {
    setDeck({ ...deck, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    async function loadDecks() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDecks();
  }, [deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/decks/${deckId}`}>{`${deck.name}`}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>

      <form>
        <fieldset>
          <h2>Edit Deck</h2>
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

          <div>
            <label>Description</label>
            <div className="form-group">
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
          </div>
          <div className="d-flex bd-highlight mb-3">
            <div className="p-2 bd-highlight">
              <button className="btn btn-secondary">
                <Link to={`/decks/${deckId}`} style={{ color: "#FFF" }}>
                  Cancel
                </Link>
              </button>
            </div>
            <div className="p-2 bd-highlight">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleSubmit}
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
export default EditDeck;
