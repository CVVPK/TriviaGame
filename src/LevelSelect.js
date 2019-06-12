import React, { useState } from "react";
import { Settings } from "./SettingsProvider";
import { getCategories } from "./openTDB";
import Fab from "@material-ui/core/Fab";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";

export default function LevelSelect() {
    return (
        <Settings.Consumer>
            {({ state: { difficulty, category }, onChange, onClick }) => (
                <FormControl>
                    <DifficultySelect
                        difficulty={difficulty}
                        onChange={onChange}
                    />
                    <CategorySelect category={category} onChange={onChange} />
                    <Fab size="large" onClick={onClick}>
                        Play
                    </Fab>
                </FormControl>
            )}
        </Settings.Consumer>
    );
}

function DifficultySelect({ difficulty, onChange }) {
    return (
        <FormControl>
            <InputLabel htmlFor="difficulty-select">Difficulty</InputLabel>
            <NativeSelect
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

function CategorySelect({ category, onChange }) {
    const [categories, setCategories] = useState([]);

    // Populate categories with the categories available in the DB.
    if (categories.length === 0)
        getCategories().then((categories) => setCategories(categories));

    return (
        <FormControl>
            <InputLabel htmlFor="category-select">Category</InputLabel>
            <NativeSelect
                value={category}
                onChange={onChange}
                input={<Input name="category" id="category-select" />}
            >
                <option value="" />
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    );
}
