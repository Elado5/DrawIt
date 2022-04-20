import React from 'react';
import { Link } from 'react-router-dom';
import randomWords from 'random-words';

const WordChoicePage = () => {

    const getWordViaLength = (length) => {

        let word = "";

        while (true) {
            word = randomWords({ exactly: 1, maxLength: length, join: '' });
            if (word.length === length) {
                return word;
            }
        }
    }

    const getWordViaMinMax = (min, max) => {

        let word = "";

        while (true) {
            word = randomWords({ exactly: 1, maxLength: max, join: '' });
            if (word.length === min || word.length === max) {
                return word;
            }
        }
    }

    console.log('getWordViaMinMax(3,4) ', getWordViaMinMax(3, 4));

    return (
        <div className="words-choice">
            <Link to={{pathname:`/drawing`, state:{points: 1}}}>
                <button className="easy-word">{getWordViaMinMax(3, 4)}</button>
            </Link>
            <Link to={{pathname:`/drawing`, state:{points: 3}}}>
                <button className="medium-word">{getWordViaLength(5)}</button>
            </Link>
            <Link to={{pathname:`/drawing`, state:{points: 5}}}>
                <button className="easy-word">{getWordViaLength(6)}</button>
            </Link>
        </div>
    )
}

export default WordChoicePage;