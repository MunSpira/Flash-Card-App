import React, { useState } from "react";

import { useHistory, Link, useParams } from "react-router-dom";

function StudyCard({ cards }) {
  const [currentCard, setCurrentCard] = useState(0);
  const [frontSide, setFrontSide] = useState(true);
  const history = useHistory();
  const { deckId } = useParams();

  const handleFlip = () => {
    setFrontSide(!frontSide);
  };

  const handleLastCard = () => {
    if (
      !window.confirm("Restart Cards? Click cancel to go to the home page.")
    ) {
      history.push("/");
    } else {
      setCurrentCard(0);
      setFrontSide(true);
    }
  };

  const handleNext = () => {
    if (currentCard + 1 === cards.length) {
      return handleLastCard();
    }
    setCurrentCard(currentCard + 1);
    setFrontSide(true);
  };

  if (!cards) {
    return null;
  }

  if (cards.length > 2) {
    return (
      <div>
        {(
          <div className="list-group-item">
            <h4>
              Card {currentCard + 1} of {cards.length}
            </h4>
            <p>
              {frontSide ? cards[currentCard].front : cards[currentCard].back}
            </p>
            <div className="d-flex bd-highlight mb-3">
              <div className="p-2 bd-highlight">
                <button className="btn btn-secondary" onClick={handleFlip}>
                  Flip
                </button>
              </div>
              <div className="p-2 bd-highlight">
                {frontSide ? null : (
                  <button className="btn btn-primary" onClick={handleNext}>
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h3>Not enough cards.</h3>
        <p>
          You need at least 3 cards to study. There{" "}
          {cards.length === 1
            ? "is " + cards.length + " card in this deck."
            : "are " + cards.length + " cards in this deck."}
        </p>
        <button className="btn btn-primary">
          {" "}
          <Link to={`/decks/${deckId}/cards/new`} style={{ color: "#FFF" }}>
            {" "}
            + Add cards
          </Link>{" "}
        </button>
      </div>
    );
  }
}

export default StudyCard;
