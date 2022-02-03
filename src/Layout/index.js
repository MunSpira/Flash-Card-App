import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "../Deck/CreateDeck";
import Deck from "../Deck/Deck";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard"
import EditCard  from "./EditCard";
import Study from "./Study";
import { Route, Switch } from "react-router-dom";

function Layout({frontCard}) {
                                                                                                                                                                                                                                                                                  
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
       
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/decks/new">
              <CreateDeck />
            </Route>

            <Route exact path="/decks/:deckId">
              <Deck />
            </Route>

            <Route exact path = "/decks/:deckId/edit">
              <EditDeck />
              </Route>

              <Route exact path = "/decks/:deckId/cards/new">
                <AddCard />
                </Route>
                <Route exact path = "/decks/:deckId/cards/:cardId/edit">
                  <EditCard />
                  </Route>

                  <Route exact path = "/decks/:deckId/study">
                    <Study frontCard={frontCard}/>
                    </Route>

            <Route>
              <NotFound />
            </Route>
          </Switch>
        
      </div>
    </>
  );
}

export default Layout;
