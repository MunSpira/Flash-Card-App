import React, { useState, useEffect } from "react";
import { readDeck, createCard } from "../utils/api/index";
import { Link, useParams } from "react-router-dom";

function AddCard() {
  const [deck, setDeck] = useState({ name: "", description: "" });
  const [card, setCard] = useState({ front: "", back: "" });

  let { deckId } = useParams();
  deckId = Number(deckId);

  function changeHandler(event) {
    setCard({ ...card, [event.target.name]: event.target.value });
  }

  async function handleSubmit() {
    await createCard(deckId, card);
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
            Add Card
          </li>
        </ol>
      </nav>
      <form>
        <fieldset>
          <legend>{`${deck.name}`}: Add Card</legend>
          <div className="form-group">
            <label>Front</label>
            <textarea
              type="text"
              id="front"
              name="front"
              placeholder="Front side of card"
              value={card.front}
              onChange={changeHandler}
              className="form-control"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Back</label>
            <textarea
              id="back"
              type="text"
              name="back"
              placeholder="Back side of card"
              value={card.back}
              onChange={changeHandler}
              className="form-control"
            ></textarea>
          </div>
          <div className="d-flex bd-highlight mb-3">
            <div className="p-2 bd-highlight">
              <button className="btn btn-secondary">
                <Link to={`/decks/${deck.id}`} style={{ color: "#FFF" }}>
                  Done
                </Link>
              </button>
            </div>
            <div className="p-2 bd-highlight">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default AddCard;
