import React from 'react';
import { players } from "./constants";

const classNames = require('classnames');

export function ScoreComponent(props) {
    let xIsActive = props.xIsNext && props.value === players.x,
        oIsActive = !props.xIsNext && props.value === players.o,
        active = xIsActive || oIsActive,
        points = props.value === players.x ? props.points[0] : props.points[1];

    return (
        <div className={classNames("game-board_score", { "active": active })}>
            <div className="score-content">
                <div className="score-content_column">
                    <div className="score-content_header">Player</div>
                    <div className="score-content_text">{props.value}</div>
                </div>
                <div className="score-content_column">
                    <div className="score-content_header">Moves</div>
                    <div className="score-content_text">{active ? props.moveCount : "-"}</div>
                </div>
                <div className="score-content_column">
                    <div className="score-content_header">Points</div>
                    <div className="score-content_text">{points}</div>
                </div>
            </div>
            <div className="score-returns">
                <div className={classNames("score-returns_box", { "green": props.returnCount === 3 })}></div>
                <div className={classNames("score-returns_box", { "orange": props.returnCount >= 2 })}></div>
                <div className={classNames("score-returns_box", { "red": props.returnCount >= 1 })}></div>
            </div>
        </div>
    );
}