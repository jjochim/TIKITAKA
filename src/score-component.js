import React from 'react';
import { players } from "./constants";

const classNames = require('classnames');

export function ScoreComponent(props) {
    let scoreClassName = classNames("game-board_score",
            {"active": props.xIsNext && props.value === players.x},
            {"active": !props.xIsNext && props.value === players.o}
        ),
        points = props.value === players.x ? props.points[0] : props.points[1],
        moveCount;

    return (
        <div className={scoreClassName}>
            <div className="score-content">
                <div className="score-content_column">
                    <div className="score-content_header">Player</div>
                    <div className="score-content_text">{props.value}</div>
                </div>
                <div className="score-content_column">
                    <div className="score-content_header">Moves</div>
                    <div className="score-content_text">{props.moveCount}</div>
                </div>
                <div className="score-content_column">
                    <div className="score-content_header">Points</div>
                    <div className="score-content_text">{points}</div>
                </div>
            </div>
            <div className="score-returns">
                <div className={classNames("score-returns_box", { "green": props.returnCount === 3 })}></div>
                <div className="score-returns_box orange"></div>
                <div className="score-returns_box red"></div>
            </div>
        </div>
    );
}