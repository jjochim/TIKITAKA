import React from 'react';
import { players } from "./constants";

const classNames = require('classnames');

export function SquareComponent(props) {
    return (
        <button className={classNames("square", {"used": props.value.type() !== players.unknown })} onClick={props.onClick}>
            <div className={classNames("line", props.value.rowClassName, `player-${props.value.type()}`)}></div>
            <div className={classNames("line", props.value.colClassName, `player-${props.value.type()}`)}></div>
            <span className="text">
                {props.value.type()}
            </span>
        </button>
    );
}