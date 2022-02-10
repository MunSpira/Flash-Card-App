import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { useParams, Link } from "react-router-dom";
import StudyCard from "./StudyCard";
function Study() {
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
        {/* {deck.cards} */}
        <StudyCard cards={deck.cards} />
      </div>
    </div>
  );
}

export default Study;
