import React, { useEffect, useState } from "react";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";

function EditCard() {
  const { deckId } = useParams();
  const { cardId } = useParams();
  const [deck, setDeck] = useState({ name: "", description: "" });
  const [card, setCard] = useState({ front: "", back: "" });
  const history = useHistory();

  useEffect(() => {
    async function loadDecks() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDecks();
  }, [deckId]);

  useEffect(() => {
    async function loadCard() {
      const loadedCard = await readCard(cardId);
      setCard(loadedCard);
    }
    loadCard();
  }, [cardId]);

  function changeHandler(event) {
    setCard({ ...card, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await updateCard(card);

    history.push(`/decks/${deckId}`);
  }

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
            Edit Card: {`${cardId}`}
          </li>
        </ol>
      </nav>
      <form>
        <fieldset>
          <h2>Edit Card</h2>
          <div>
            <label>Front</label>
            <div className="form-group">
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
          </div>

          <div>
            <label>Back</label>
            <div className="form-group">
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

export default EditCard;
