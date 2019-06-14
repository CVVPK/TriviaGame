import React, { useState } from "react";
import { Settings } from "./SettingsProvider";
import { getCategories } from "./openTDB";
import Fab from "@material-ui/core/Fab";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    playBtn: {
        marginTop: theme.spacing(5)
    },
    select: {
        fontSize: "1.5rem"
    }
}));

export default function LevelSelect() {
    const classes = useStyles();
    return (
        <Settings.Consumer>
            {({ state: { difficulty, category }, onChange, onClick }) => (
                <Grid container justify="center" alignContent="space-around">
                    <FormControl>
                        <DifficultySelect
                            difficulty={difficulty}
                            onChange={onChange}
                            className={classes.select}
                        />

                        <CategorySelect
                            category={category}
                            onChange={onChange}
                            className={classes.select}
                        />
                        <Fab
                            size="large"
                            onClick={onClick}
                            className={classes.playBtn}
                            variant="extended"
                            color="primary"
                        >
                            <Typography variant="h4">Start</Typography>
                        </Fab>
                    </FormControl>
                </Grid>
            )}
        </Settings.Consumer>
    );
}

function DifficultySelect({ difficulty, onChange, className }) {
    return (
        <FormControl>
            <InputLabel htmlFor="difficulty-select">Difficulty</InputLabel>
            <NativeSelect
                className={className}
                value={difficulty}
                onChange={onChange}
                input={<Input name="difficulty" id="difficulty-select" />}
            >
                <option value="" />
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
            </NativeSelect>
        </FormControl>
    );
}

function CategorySelect({ category, onChange, className }) {
    const [categories, setCategories] = useState([]);

    // Populate categories with the categories available in the DB.
    if (categories.length === 0)
        getCategories().then((categories) => setCategories(categories));
    console.log(category);
    return (
        <FormControl>
            <InputLabel htmlFor="category-select">Category</InputLabel>
            <NativeSelect
                className={className}
                value={category}
                onChange={onChange}
                input={<Input name="category" id="category-select" />}
            >
                <option value="" />
                {categories.map((category) => (
                    <option
                        key={category.id}
                        value={JSON.stringify({
                            id: category.id,
                            name: category.name
                        })}
                        // value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    );
}
