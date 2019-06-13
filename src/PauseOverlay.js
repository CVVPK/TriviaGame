import React from "react";

export default function PauseOverlay() {
    return <div style={pauseStyle} />;
}

const pauseStyle = {
    zIndex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7,
    backgroundColor: "black"
};
