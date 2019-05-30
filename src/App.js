import React, { useState } from "react";
import { MyContext, MyProvider } from "./MyContext";
import Game from "./Game.js";
import LevelSelect from "./LevelSelect";

export default function App() {
    const [displayGame, setDisplayGame] = useState(false);

    return (
        <MyProvider setDisplayGame={setDisplayGame}>
            {!displayGame && <LevelSelect />}
            {displayGame && <Game />}
        </MyProvider>
    );
}
