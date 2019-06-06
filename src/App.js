import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import MyProvider from "./MyContext";
import Game from "./Game.js";
import LevelSelect from "./LevelSelect";

export default function App() {
    const [displayGame, setDisplayGame] = useState(true); // false

    return (
        <Container maxWidth="sm">
            <MyProvider setDisplayGame={setDisplayGame}>
                {!displayGame && <LevelSelect />}
                {displayGame && <Game />}
            </MyProvider>
        </Container>
    );
}
