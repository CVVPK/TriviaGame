import React from "react";

export default function MoneyTree({ values, current }) {
    function setCurrent(item) {
        if (item === current) return "current";
    }

    return (
        <ul>
            {values.map((val, i) => (
                <li key={val} className={setCurrent(i)}>
                    {val}
                </li>
            ))}
        </ul>
    );
}
