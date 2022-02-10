import React from "react"
import {Link} from "react-router-dom"




function Form({card, changeHandler, deckId, handleSubmit, FormName, Cancel, Submit }){


  return(
    <form>
    <fieldset>
      <h2>{FormName}</h2>
      <div>
        <label>Front</label>
        <div className="form-group">
          <textarea
            type="text"
            id="front"
            name="front"
            placeholder="Front side of card"
            value={card.front}
            onChange={changeHandler}
            className="form-control"
          ></textarea>
        </div>
      </div>

      <div>
        <label>Back</label>
        <div className="form-group">
          <textarea
            id="back"
            type="text"
            name="back"
            placeholder="Back side of card"
            value={card.back}
            onChange={changeHandler}
            className="form-control"
          ></textarea>
        </div>
      </div>
      <div className="d-flex bd-highlight mb-3">
        <div className="p-2 bd-highlight">
          <button className="btn btn-secondary">
            <Link to={`/decks/${deckId}`} style={{ color: "#FFF" }}>
              {Cancel}
            </Link>
          </button>
        </div>
        <div className="p-2 bd-highlight">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            {Submit}
          </button>
        </div>
      </div>
    </fieldset>
  </form>
    
   
  )


}
 export default Form;