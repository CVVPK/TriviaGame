import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import SettingsProvider from "./SettingsProvider";
import Game from "./Game.js";
import LevelSelect from "./LevelSelect";

export default function App() {
    const [displayGame, setDisplayGame] = useState(false); // false to show settings

    return (
        <Container maxWidth="lg">
            <SettingsProvider setDisplayGame={setDisplayGame}>
                {!displayGame && <LevelSelect />}
                {displayGame && <Game />}
            </SettingsProvider>
        </Container>
    );
}
