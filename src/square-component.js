import React from 'react';

const classNames = require('classnames');

export function SquareComponent(props) {
    return (
        <button className={classNames("square", { "row": props.value.row }, { "col": props.value.col })} onClick={props.onClick}>
            {props.value.type()}
        </button>
    );
}