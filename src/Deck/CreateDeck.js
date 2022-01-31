import React, { useState } from "react";
import { createDeck } from "../utils/api/index"
import { useHistory, Link} from "react-router-dom";

function CreateDeck() {
  const [deck, setDeck] = useState({ name: "", description: "" });
  const history = useHistory();
 

 async function handleSubmit  (event)  {
    event.preventDefault()
     ;
     const response = await createDeck(deck)
    console.log(response)

    history.push(`/decks/${response.id}`);
  };

  function changeHandler(event) {
    setDeck({ ...deck, [event.target.name]: event.target.value });
  }

  

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Create Deck</legend>
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
            <label >Description</label>
            <textarea
              id="description"
              type="text"
              name="description"
              placeholder="Brief description of the deck"
              value={deck.description}
              onChange={changeHandler}
            ></textarea>
          </div>

          <button onClick={handleCancel}>Cancel</button>

          <button onClick={handleSubmit} type="submit">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default CreateDeck;
