import React from "react";
import { useHistory } from "react-router-dom"
//import {deleteDeck} from "../utils/api/index"




function Home () {
const history = useHistory()
//const{deckId} = useParams()
//const[deck, setDeck] = useState([])

const handleCreate = ()=>{
    history.push("/decks/new")
}

/*function handleDelete (event) {
    event.preventDefault()
    if(window.confirm("Delete this deck? You will not be able to recover it.")){
    const delDeck = deleteDeck(deckId)
    setDeck(delDeck)
    }
}*/

    return (

<div>
<button onClick = {handleCreate} >Create Deck</button>



<button>Study</button>

<button>View</button>

<button >Delete</button>

</div>

    )
}

export default Home