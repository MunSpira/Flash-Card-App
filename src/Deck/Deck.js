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
        <div className="d-flex bd-highlight mb-3">
          <div className="p-2 bd-highlight">
            <button className="btn btn-secondary" onClick={handleEdit}>
              Edit
            </button>
          </div>
          <div className="p-2 bd-highlight">
            <button
              className="btn btn-primary"
              onClick={() => {
                history.push(`/decks/${deck.id}/study`);
              }}
            >
              Study
            </button>
          </div>
          <div className="p-2 bd-highlight">
            <button className="btn btn-primary" onClick={handleAddCards}>
              + Add Cards
            </button>
          </div>
          <div className="ml-auto p-2 bd-highlight">
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      <div>
        <h1>Cards</h1>
        <div className="card">
          {deck.cards?.map((card) => (
            <div className="list-group-item" key={card.id}>
              <div className="d-flex p-2 bd-highlight">
                <div className= "container-fluid">
                <div className="d-flex justify-content-between">
                  <p>{card.front}</p>
               
                  <p>{card.back}</p>
                </div>
                </div>
              </div>
              <div className="d-flex flex-row-reverse bd-highlight">
                <div className="p-2 bd-highlight">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (window.confirm(
                        "Delete this card? You will not be able to recover it."
                      )) {
                        deleteCard(`${card.id}`);
                        window.location.reload(false);
                      }
                    } }
                  >
                    Delete
                  </button>
                </div>
                <div className="p-2 bd-highlight">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      history.push(`/decks/${deckId}/cards/${card.id}/edit`);
                    } }
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Deck;
