import React, { useState } from 'react';
import './../Stylesheet.css';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';

function Wordle() {
    const [word, setWord] = useState(pickRandomWord());
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState(Array(5).fill(''));

    function handleInputChange(e, index) {
        if(/^[a-zA-Z]$/.test(e.target.value) || e.target.value === '') {
            const newGuess = [...currentGuess];
            newGuess[index] = e.target.value;
            setCurrentGuess(newGuess);
            
            if (index < 4 && e.target.value) {
                document.getElementById(`input-${index+1}`).focus();
            }
        }
    }
    
    function handleGuess() {
        const guessString = currentGuess.join('');
        if (guessString.length !== 5 || guesses.includes(guessString)) return;
        setGuesses(prev => [...prev, guessString]);
        setCurrentGuess(Array(5).fill(''));
        document.getElementById(`input-0`).focus();
    }

    function feedback(guess) {
        return word.split('').map((char, index) => {
            if (char === guess[index]) return 'green';
            if (word.includes(guess[index])) return 'yellow';
            return 'gray';
        });
    }

    const handleKeyPress = (e, index) => {
        if(e.key === 'Backspace') {
            if(currentGuess[index] === null || currentGuess[index] === '') {
                console.log(e);
                if (index > 0) {
                    console.log("backspace pressed.")
                    document.getElementById(`input-${index-1}`).focus();
                }
            }
            else {

            }
        }
        else if(e.key === 'ArrowLeft') {
            if (index > 0) {
                document.getElementById(`input-${index-1}`).focus();
            }
        }
        else if(e.key === 'ArrowRight') {
            if (index < 4) {
                document.getElementById(`input-${index+1}`).focus();
            }
        }
        else if (e.key === 'Enter'){
            handleGuess();
        }

    }

    return (
        <div className="wordle-container">
            <h1>Wordle Game</h1>
            {guesses.map((guess, index) => (
                <div className='guesses' key={index}>
                    {guess.split('').map((char, i) => (
                        <div className='guess-letter' key={i} color={feedback(guess)[i]}>
                            {char}
                        </div>
                    ))}
                </div>
            ))}
            
            <div className="input-boxes">
                {currentGuess.map((char, index) => (
                    <input 
                    key={index} 
                    id={`input-${index}`} 
                    maxLength="1"
                    value={char} 
                    onChange={e => handleInputChange(e, index)}
                    onKeyDown={e => handleKeyPress(e, index)} tabIndex="0"
                />
                ))}
            </div>
            <button type="submit" onClick={handleGuess} >Guess</button>

            
        </div>
    );
}

function pickRandomWord() {
  const words = [
    'apple', 'grape', 'peach', 'melon', 'berry', 'bread', 'crisp', 'dairy',
    'easel', 'freak', 'globe', 'haste', 'inlet', 'jolly', 'knack', 'latch',
    'mound', 'nudge', 'ocean', 'pluck', 'query', 'ruler', 'swoop', 'train',
    'usher', 'vexed', 'woven', 'xenon', 'yarns', 'zoned', 'alert', 'bluff',
    'crane', 'drone', 'elbow', 'flint', 'giddy', 'hover', 'ivory', 'joust',
    'kneel', 'lumen', 'noble', 'onset', 'pride', 'quilt', 'rover', 'shine',
    'tweak', 'unzip', 'vowel', 'wrist', 'yacht', 'zippy', 'amble', 'blitz',
    'charm', 'dwell', 'enact', 'fjord', 'glint', 'honor', 'input', 'jumbo',
    'kiosk', 'liver', 'motel', 'nonce', 'optic', 'prong', 'quash', 'robin',
    'skirt', 'tripe', 'ultra', 'vault', 'whale', 'yield', 'zooms', 'ached',
    'blush', 'cline', 'douse', 'exile', 'froze', 'gloom', 'hitch', 'irate', 
    'joker', 'laced', 'mirth', 'niece', 'ounce', 'pleat', 'quell', 'ridge', 
    'sling', 'talon', 'uncut'
];
  
  const random = new SeededRandom(getSeedForToday());
  const index = Math.floor(random.nextFloat() * words.length);

  return words[index];
}

function getSeedForToday() {
  const today = new Date();
  return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
}

class SeededRandom {
  constructor(seed) {
      this.seed = seed % 2147483647;
      if (this.seed <= 0) this.seed += 2147483646;
  }

  next() {
      return this.seed = this.seed * 16807 % 2147483647;
  }

  nextFloat() {
      return (this.next() - 1) / 2147483646;
  }
}



export default Wordle;