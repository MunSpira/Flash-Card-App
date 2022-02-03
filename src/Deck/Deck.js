import React, { useEffect, useState } from "react";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import { Link, useParams, useHistory } from "react-router-dom";

function Deck() {
  const { deckId } = useParams();

  const [deck, setDeck] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function loadDecks() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDecks();
  }, [deckId]);

  const handleEdit = (event) => {
    event.preventDefault();
    history.push(`/decks/${deckId}/edit`);
  };

  function handleDelete(event) {
    event.preventDefault();
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      const delDeck = deleteDeck(deckId);
      setDeck(delDeck);
    }
  }

  function handleAddCards(event) {
    event.preventDefault();
    history.push(`/decks/${deckId}/cards/new`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {`${deck.name}`}
          </li>
        </ol>
      </nav>
      <div>
        <h3>{`${deck.name}`}</h3>
        <p>{`${deck.description}`}</p>
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick = {()=> {history.push(`/decks/${deck.id}/study`)}}>Study</button>
          <button onClick={handleAddCards}>Add Cards</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
      <div>
        <h1>Cards</h1>
        <div>
          {deck.cards &&
            deck.cards.map((card) => (
              <div key={card.id}>
                <p>{card.front}</p>
                <p>{card.back}</p>
                <button
                  onClick={() => {
                    history.push(`/decks/${deckId}/cards/${card.id}/edit`);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Delete this card? You will not be able to recover it."
                      )
                    ) {
                      deleteCard(`${card.id}`);
                      window.location.reload(false)
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Deck;
