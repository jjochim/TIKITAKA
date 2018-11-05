import React from 'react';

const classNames = require('classnames');

export function SquareComponent(props) {
    return (
        <button className={classNames("square", props.value.rowClassName, props.value.colClassName)} onClick={props.onClick}>
            {props.value.type()}
        </button>
    );
}