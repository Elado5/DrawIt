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
            <Link to={`/drawing`} state={{pointsForWord:1, word: getWordViaMinMax(3, 4)}}>
                <button className="word-button">Easy Word - 1 Point</button>
            </Link>
            <Link to={`/drawing`} state={{pointsForWord:3, word: getWordViaLength(5)}}>
                <button className="word-button">Medium Word - 3 Points</button>
            </Link>
            <Link to={`/drawing`} state={{pointsForWord:5, word: getWordViaLength(6)}}>
                <button className="word-button">Hard Word - 5 Points</button>
            </Link>
        </div>
    )
}

export default WordChoicePage;