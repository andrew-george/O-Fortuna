import React, { useEffect, useState } from 'react'
import { BsClipboard, BsClipboardCheck } from 'react-icons/bs'

const lyrics =
	'O Fortuna Velut luna Statu variabilis Semper crescis Aut decrescis Vita detestabilis Nunc obdurat Et tunc curat Ludo mentis aciem Egestatem Potestatem Dissolvit ut glaciem. Sors immanis Et inanis Rota tu volubilis Status malus Vana salus Semper dissolubilis Obumbrata Et velata Michi quoque niteris Nunc per ludum Dorsum nudum Fero tui sceleris Sors salutis Et virtutis Michi nunc contraria est affectus et defectus semper in angaria. Hac in hora Sine mora Corde pulsum tangite Quod per sortem Sternit fortem Mecum omnes plangite!\n'

const splitParams = ['Characters', 'Words', 'Paragraphs']

export default function App() {
	const [output, setOutput] = useState('')
	const [currentSplitParam, setCurrentSplitParam] = useState('Paragraphs')
	const [numberInput, setNumberInput] = useState(1)
	const [activeBtn, setActiveBtn] = useState('Paragraphs')
	const [isCopied, setIsCopied] = useState(false)

	function selectSplit(event) {
		setCurrentSplitParam(event.target.innerText)
		setActiveBtn(event.target.innerText)
	}

	function generateText() {
		if (numberInput < 0) return

		if (currentSplitParam === 'Characters') {
			const charachtersArr = lyrics.split('')

			if (numberInput <= charachtersArr.length) {
				setOutput(charachtersArr.slice(0, numberInput).join(''))
			}

			if (numberInput > charachtersArr.length) {
				const repeatTimes = Math.ceil(numberInput / charachtersArr.length)
				const repeatedCharArr = charachtersArr
					.join('')
					.repeat(repeatTimes)
					.split('')

				setOutput(repeatedCharArr.slice(0, numberInput).join(''))
			}
		}

		//- WORDS
		if (currentSplitParam === 'Words') {
			// split into array of words
			const wordsArr = lyrics.split(' ')

			// if number input is less than the length of one paragraph
			if (numberInput <= wordsArr.length) {
				setOutput(wordsArr.slice(0, numberInput).join(' '))
			}

			// if number input is more than the length of one paragraph, repeat the paragraph dynamically and then construct output
			if (numberInput > wordsArr.length) {
				const repeatTimes = Math.ceil(numberInput / wordsArr.length)
				const repeatedWordsArr = wordsArr
					.join(' ')
					.repeat(repeatTimes)
					.split(' ')

				setOutput(repeatedWordsArr.slice(0, numberInput).join(' '))
			}
		}

		//- PARAGRAPHS
		if (currentSplitParam === 'Paragraphs') {
			setOutput(lyrics.repeat(numberInput))
		}
	}

	function copyText() {
		//- validate if there is anything to copy
		if (!output) return
		if (output) {
			navigator.clipboard.writeText(output)
			setIsCopied(true)
			setTimeout(() => {
				setIsCopied(false)
			}, 3000)
		}
	}

	useEffect(generateText, [numberInput, currentSplitParam])

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
							{splitParams.map((param, index) => {
								return (
									<button
										key={index}
										className={activeBtn === param ? 'btn active-btn' : 'btn'}
										onClick={selectSplit}
									>
										{param}
									</button>
								)
							})}
						</div>
						<input
							type='number'
							value={numberInput}
							min='0'
							onInput={event => {
								setNumberInput(event.target.value)
							}}
						/>
					</div>
					<textarea
						id='output'
						placeholder='Your text will appear here...'
						value={output}
						readOnly
					></textarea>
					{}
					<button className='copy-btn' onClick={copyText} disabled={isCopied}>
						{!output ? (
							<span>Please generate text to copy!</span>
						) : !isCopied ? (
							<>
								<span>Copy to clipboard</span> <BsClipboard />
							</>
						) : (
							<>
								<span>Copied</span> <BsClipboardCheck />
							</>
						)}
					</button>
				</div>
				<a href='https://github.com/andrew-george' className='copyright'>
					&copy; Designed & Developed by <span>Andrew Berty</span>
				</a>
			</div>
		</div>
	)
}
