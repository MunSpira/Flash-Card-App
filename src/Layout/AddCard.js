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
    const response = await createCard(deckId, card);
    console.log(response);
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
            <Link to={`/decks/${deck.id}`}>{`${deck.name}`}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <form>
        <fieldset>
          <legend>{`${deck.name}`}: Add Card</legend>
          <div>
            <label>Front</label>
            <textarea
              type="text"
              id="front"
              name="front"
              placeholder="Front side of card"
              value={card.front}
              onChange={changeHandler}
            ></textarea>
          </div>

          <div>
            <label>Back</label>
            <textarea
              id="back"
              type="text"
              name="back"
              placeholder="Back side of card"
              value={card.back}
              onChange={changeHandler}
            ></textarea>
          </div>

          <button>
            <Link to={`/decks/${deck.id}`}>Done</Link>
          </button>

          <button type="submit" onClick={handleSubmit}>
            Save
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default AddCard;
