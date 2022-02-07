import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";

function Home() {
  const history = useHistory();

  const [decks, setDecks] = useState([]);

  const handleCreate = () => {
    history.push("/decks/new");
  };

  useEffect(() => {
    async function listOfDecks() {
      const lisDecks = await listDecks();
      setDecks(lisDecks);
    }
    listOfDecks();
  }, []);

  return (
    <div>
      <button className="btn btn-secondary" onClick={handleCreate}>
        + Create Deck
      </button>

      <div className="card">
        {decks &&
          decks.map((deck) => (
            <div className="list-group-item" key={deck.id}>
              <div>
                <h5 className="card-title">{deck.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {deck.cards.length > 1 || deck.cards.length === 0
                    ? deck.cards.length + " cards"
                    : deck.cards.length + " card"}
                </h6>
              </div>
              <p className="card-text">{deck.description}</p>
              <div className="d-flex bd-highlight mb-3">
                <div className="p-2 bd-highlight">
                  <button className="btn btn-primary">
                    {" "}
                    <Link to={`/decks/${deck.id}`} style={{ color: "#FFF" }}>
                      {" "}
                      View
                    </Link>
                  </button>
                </div>

                <div className="p-2 bd-highlight">
                  <button className="btn btn-secondary">
                    {" "}
                    <Link
                      to={`/decks/${deck.id}/study`}
                      style={{ color: "#FFF" }}
                    >
                      {" "}
                      Study
                    </Link>
                  </button>
                </div>
                <div className="ml-auto p-2 bd-highlight">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Delete this deck? You will not be able to recover it."
                        )
                      ) {
                        deleteDeck(`${deck.id}`);
                        window.location.reload(false);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
