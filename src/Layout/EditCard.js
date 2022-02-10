import React, { useEffect, useState } from "react";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";
import Form from "./Form";

function EditCard() {
  const { cardId } = useParams();
  const [deck, setDeck] = useState({ name: "", description: "" });
  const [card, setCard] = useState({ front: "", back: "" });
  const history = useHistory();
  const { deckId } = useParams();

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
      <Form
        card={card}
        changeHandler={changeHandler}
        deckId={deckId}
        handleSubmit={handleSubmit}
        FormName="Edit Card"
        Cancel="Cancel"
        Submit="Submit"
      />
    </div>
  );
}

export default EditCard;
