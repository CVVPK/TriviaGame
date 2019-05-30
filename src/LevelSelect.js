import React, { useState } from "react";
import { MyContext } from "./MyContext";
import { getCategories } from "./openTDB";

export default function LevelSelect() {
    return (
        <MyContext.Consumer>
            {({ onSubmit }) => (
                <form onSubmit={onSubmit}>
                    <DifficultySelect />
                    <CategorySelect />
                    <input type="submit" value="Play" />
                </form>
            )}
        </MyContext.Consumer>
    );
}

function DifficultySelect() {
    return (
        <MyContext.Consumer>
            {({ state: { difficulty }, onChange }) => (
                <label>
                    Difficulty
                    <select
                        name="difficulty"
                        value={difficulty}
                        onChange={onChange}
                    >
                        <option defaultValue value="easy">
                            Easy
                        </option>
                        <option value="normal">Normal</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>
            )}
        </MyContext.Consumer>
    );
}

function CategorySelect() {
    const [categories, setCategories] = useState([]);

    // Populate categories with the categories available in the DB.
    getCategories().then((categories) => setCategories(categories));

    return (
        <MyContext.Consumer>
            {({ state: { category }, onChange }) => (
                <label>
                    Category:
                    <select
                        name="category"
                        value={category}
                        onChange={onChange}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
            )}
        </MyContext.Consumer>
    );
}
