import React, { useEffect, useState } from "react";
import { readDeck, updateDeck } from "../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";

function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "", description: "" });
  const history = useHistory();
 

 async function handleSubmit  (event)  {
    event.preventDefault()
     ;
     const response = await updateDeck(deck)
    console.log(response)

    history.push(`/decks/${response.id}`);
  };

  function changeHandler(event) {
    setDeck({ ...deck, [event.target.name]: event.target.value });
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
              <Link to ={`/decks/${deck}`}>
            {`${deck.name}`}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>

      <form>
        <fieldset>
          <legend>Edit Deck</legend>
          <div>
            <label>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Deck Name"
              value={deck.name}
              onChange={changeHandler}
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              id="description"
              type="text"
              name="description"
              placeholder="Brief description of the deck"
              value={deck.description}
              onChange={changeHandler}
            ></textarea>
          </div>

          <button ><Link to ={`/decks/${deck.id}`}>
            Cancel</Link></button>

          <button type="submit" onClick={handleSubmit} >
            Submit
           
          </button>
        </fieldset>
      </form>
    </div>
  );
}
export default EditDeck;
