import React from 'react';
import Parser from 'html-react-parser';

export default function PostBody({content}) {
    return (
        <div>
            <div>{Parser(content)}</div>
        </div>
    )
}
