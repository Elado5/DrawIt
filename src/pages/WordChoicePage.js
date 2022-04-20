import React from 'react';
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
            <div className="easy-word">{getWordViaMinMax(3, 4)}</div>
            <div className="medium-word">{getWordViaLength(5)}</div>
            <div className="easy-word">{getWordViaLength(6)}</div>
        </div>
    )
}

export default WordChoicePage;