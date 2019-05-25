import React, { useState } from "react";
import { getCategories } from "./openTDB";

export default function LevelSelect({
    onSubmit,
    difficulty,
    category,
    onChange
}) {
    return (
        <form onSubmit={onSubmit}>
            <DifficultySelect difficulty={difficulty} onChange={onChange} />
            <CategorySelect category={category} onChange={onChange} />
            <input type="submit" value="Play" />
        </form>
    );
}

function DifficultySelect({ difficulty, onChange }) {
    return (
        <label>
            Difficulty
            <select name="difficulty" value={difficulty} onChange={onChange}>
                <option defaultValue value="easy">
                    Easy
                </option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
            </select>
        </label>
    );
}

function CategorySelect({ category, onChange }) {
    const [categories, setCategories] = useState([]);

    getCategories().then((categories) => setCategories(categories));
    return (
        <label>
            Category:
            <select name="category" value={category} onChange={onChange}>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </label>
    );
}
