import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import SettingsProvider from "./components/Settings/SettingsProvider";
import Game from "./components/Game/Game";
import LevelSelect from "./components/Settings/LevelSelect";

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
