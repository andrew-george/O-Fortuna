import React, { useState, useEffect } from 'react';

export default function App() {
  //* states
  const [lyrics, setLyrics] = useState(
    'O Fortuna Velut luna Statu variabilis Semper crescis Aut decrescis Vita detestabilis Nunc obdurat Et tunc curat Ludo mentis aciem Egestatem Potestatem Dissolvit ut glaciem. Sors immanis Et inanis Rota tu volubilis Status malus Vana salus Semper dissolubilis Obumbrata Et velata Michi quoque niteris Nunc per ludum Dorsum nudum Fero tui sceleris Sors salutis Et virtutis Michi nunc contraria est affectus et defectus semper in angaria. Hac in hora Sine mora Corde pulsum tangite Quod per sortem Sternit fortem Mecum omnes plangite!\n'
  );
  const [output, setOutput] = useState('');
  const [currentSplitParam, setCurrentSplitParam] = useState('Paragraphs');
  const [numberInput, setNumberInput] = useState(1);

  //* logic
  function selectSplit(event) {
    //-set split parameter
    setCurrentSplitParam(event.target.innerText);

    //- get siblings
    const siblings = Array.from(event.target.parentElement.children);

    //- loop over buttons remove selection
    siblings.forEach(btn => (btn.style.backgroundColor = '#000'));

    //- add selection to the clicked button
    event.target.style.backgroundColor = '#111';
  }
  useEffect(
    function generateText() {
      if (numberInput < 0) return;
      if (currentSplitParam === 'Characters') {
        setOutput(lyrics.split('').slice(0, numberInput).join(''));
      }
      if (currentSplitParam === 'Words') {
        setOutput(lyrics.split(' ').slice(0, numberInput).join(' '));
      }
      if (currentSplitParam === 'Paragraphs') {
        setOutput(lyrics.repeat(numberInput));
      }
    },
    [numberInput, currentSplitParam]
  );

  return (
    <div className='App'>
      <p className='logo'>O</p>
      <div className='container'>
        <div className='title'>O Fortuna</div>
        <div className='description'>
          PLACEHOLDER TEXT GENERATOR WITH A LATIN TASTE
        </div>
        <div className='generator-container'>
          <div className='control-panel'>
            <div className='buttons-container'>
              <button onClick={selectSplit}>Characters</button>
              <button onClick={selectSplit}>Words</button>
              <button onClick={selectSplit}>Paragraphs</button>
            </div>
            <input
              type='number'
              value={numberInput}
              min='0'
              onInput={event => {
                setNumberInput(event.target.value);
              }}
            />
          </div>
          <textarea
            id='output'
            placeholder='Your text will appear here...'
            value={output}
            readOnly
          ></textarea>
        </div>
        <a href='https://github.com/andrew-george' className='copyright'>
          &copy; Designed & Developed by <span>Andrew Berty</span>
        </a>
      </div>
    </div>
  );
}
