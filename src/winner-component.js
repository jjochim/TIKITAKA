import React from 'react';
import { players } from "./constants";

export function WinnerComponent(props) {
    let winner = props.points[0] > props.points[1] ? players.x : players.o;

    return (
        <div className="game-board_winner">
            <div>The winner is</div>
            <div className="winner">{winner}</div>
        </div>
    );
}