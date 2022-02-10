import React, { useState, useEffect } from "react";
import { readDeck, createCard } from "../utils/api/index";
import { Link, useParams } from "react-router-dom";
import Form from "./Form";

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
      <Form
        card={card}
        changeHandler={changeHandler}
        deckId={deckId}
        handleSubmit={handleSubmit}
        FormName={`${deck.name}: Add Card`}
        Cancel="Done"
        Submit="Save"
      />
    </div>
  );
}

export default AddCard;
