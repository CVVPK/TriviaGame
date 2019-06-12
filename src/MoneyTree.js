import React from "react";

export default function MoneyTree({ values, current }) {
    function setCurrent(item) {
        if (item === current) return "current";
    }

    return <span>Points: {values[current]}</span>;
}
