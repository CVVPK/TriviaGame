import React from "react";
import Grid from "@material-ui/core/Grid";
import QuestionProvider from "components/Question/QuestionProvider";
import EndGameDisplay from "./EndGameDisplay";
import { Settings } from "components/Settings/SettingsProvider";
import PlayingDisplay from "./PlayingDisplay";
import PauseOverlay from "./PauseOverlay";

// Displays the Game State
export default function GameDisplay({
    props: {
        state: { pause, playing, finish, endGameMsg, newQ, score },
        state,
        startGame,
        finishGame,
        pauseGame,
        resumeGame,
        handleClick
    }
}) {
    return (
        <Grid container>
            {pause && <PauseOverlay />}
            {!finish && (
                <Settings.Consumer>
                    {({ state: { difficulty }, categoryId, categoryName }) => (
                        <QuestionProvider
                            startGame={startGame}
                            finishGame={finishGame}
                            category={categoryId}
                            difficulty={difficulty}
                            newQ={newQ}
                            onClick={handleClick}
                            pauseGame={pauseGame}
                            resumeGame={resumeGame}
                        >
                            <PlayingDisplay
                                state={state}
                                difficulty={difficulty}
                                finishGame={finishGame}
                                categoryName={categoryName}
                            />
                        </QuestionProvider>
                    )}
                </Settings.Consumer>
            )}
            {!playing && finish && (
                <EndGameDisplay score={score} endGameMsg={endGameMsg} />
            )}
        </Grid>
    );
}
