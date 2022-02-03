import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";

function Home() {
  const history = useHistory();
// const {deckId} = useParams()
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
      <button onClick={handleCreate}>Create Deck</button>

      <div>
        {decks &&
          decks.map((deck) => (
            <div key={deck.id}>
              <div>
                <h5>{deck.name}</h5>
                <p>
                  {deck.cards.length > 1 || deck.cards.length === 0
                    ? deck.cards.length + " cards"
                    : deck.cards.length + " card"}
                </p>
              </div>
              <p>{deck.description}</p>
              <button onClick ={()=>{
                  history.push(`/decks/${deck.id}`)
              }}>View</button>
              <button onClick = {()=>{
                  history.push(`/decks/${deck.id}/study`)
              }}>Study</button>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Delete this deck? You will not be able to recover it."
                    )
                  ) {
                    deleteDeck(`${deck.id}`);
                   
                  }
                }}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
