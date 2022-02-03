import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { useParams, Link } from "react-router-dom";

function Study({cards}) {
  const { deckId } = useParams();

  const [deck, setDeck] = useState([]);

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  
  


  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>
      <div>
      {deck.cards && deck.cards.map((card) => <li key = {card.front}>{card.front}</li>)}
      </div>
     
      {/* <p>
         {deck.cards.length === 1
          ? "Not enough cards. You need at least three cards to study. There is " +
            deck.cards.length +
            " card in this deck."
          : "Not enough cards. You need at least three cards to study. There are " +
            deck.cards.length +
            " cards in this deck."}
      </p> */}
    </div>
  );
}

export default Study;
