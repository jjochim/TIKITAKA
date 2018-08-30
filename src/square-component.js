import React from 'react';

export function SquareComponent(props) {
    return (
        <button className="square" onClick={props.onClick}>
        {props.value}
        </button>
    );
}