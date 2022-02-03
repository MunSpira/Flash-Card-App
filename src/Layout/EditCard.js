import React, { useEffect, useState } from "react";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";

function EditCard() {
  const { deckId } = useParams();
  const { cardId } = useParams();
  const [deck, setDeck] = useState({ name: "", description: "" });
  const [card, setCard] = useState({ front: "", back: "" });
  const history = useHistory()

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

  async function handleSubmit  (event)  {
    event.preventDefault()
     ;
     const response = await updateCard(card)
    console.log(response)

    history.push(`/decks/${deckId}`);
  };


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
          <legend>Edit Card</legend>
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

          <button ><Link to ={`/decks/${deckId}`}>
            Cancel</Link></button>

          <button type="submit" onClick={handleSubmit} >
            Submit
           
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default EditCard;
