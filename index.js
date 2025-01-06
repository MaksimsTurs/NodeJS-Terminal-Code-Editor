import _input from "node:readline"

import Editor, { 
	isCursorOnLineStart,
	isCursorOnLineEnd, 
	isCurrentLineEmpty, 
} from "./core/Editor/Editor.core.js"
import Render from "./core/Render/Render.core.js"

import config from "./settings/config.json" with { type: "json" }

import { KEYBOARD_KEYS, WINDOWS_COLUMNS } from "./core/Editor/const.core.js"

Object.assign(Editor.config, config)
_input.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true);
console.clear()

process.stdin.on("keypress", function(word, keyMetaData) {
	const keySequence = keyMetaData.sequence
	const CTRL = keyMetaData.ctrl
	const ALT = keyMetaData.meta

	//Close code editor
	if(keySequence === "c" && CTRL) {
		Editor.close()
		return
	}

	//Append tab
	if(keySequence === KEYBOARD_KEYS.TAB && (Editor.CURSOR_COLUMN_POSITION < Editor.config.tabsize) < WINDOWS_COLUMNS) {
		Editor.tab()
		Render.line(Editor.TEXT_BUFFER[Editor.CURSOR_ROW_POSITION])
		Render.cursor(Editor.CURSOR_ROW_POSITION, Editor.CURSOR_COLUMN_POSITION)
		return
	}

	//Remove character from the end or anywhere of line
	if(keySequence === KEYBOARD_KEYS.BACKSPACE) {
		//Check if cursor is on the first row and first column
		if((Editor.CURSOR_ROW_POSITION + 1) === 1 && isCursorOnLineStart()) return

		//Jump to preview line when current line is empty
		if(isCursorOnLineStart() || isCurrentLineEmpty()) {
			Editor.removeCurrentLineAndJumpOnPreivewLine()
			Render.code(Editor.state.TEXT_BUFFER)
			Render.cursor(Editor.state.CURSOR_ROW_POSITION, Editor.state.CURSOR_COLUMN_POSITION)
			return
		}

		//Remove character from end of the line
		if(isCursorOnLineEnd() && !isCurrentLineEmpty()) {
			Editor.removeCharacterFromEndOfTheLine()
			Render.line(Editor.state.TEXT_BUFFER)
			Render.cursor(Editor.state.CURSOR_ROW_POSITION, Editor.state.CURSOR_COLUMN_POSITION)
			return
		}

		//Remove character from anywhere of the line
		if(!isCursorOnLineStart() && !isCursorOnLineEnd() && !isCurrentLineEmpty()) {
			Editor.removeCharacterFromAnywheOfTheLine()	
			Render.line(Editor.state.TEXT_BUFFER[Editor.state.CURSOR_ROW_POSITION])
			Render.cursor(Editor.state.CURSOR_ROW_POSITION, Editor.state.CURSOR_COLUMN_POSITION)
			return
		}
	}

	//Go left
	if(keySequence === KEYBOARD_KEYS.MOUSE_LEFT) {
		Editor.goLeft()
		Render.cursor(Editor.state.CURSOR_ROW_POSITION, Editor.state.CURSOR_COLUMN_POSITION)
		return
	}

	//Go right
	if(keySequence === KEYBOARD_KEYS.MOUSE_RIGHT) {
		Editor.goRight()
		Render.cursor(CURSOR_ROW, CURSOR_COLUMN)
		return	
	}

	//Go up
	if(keySequence === KEYBOARD_KEYS.MOUSE_UP) {
		Editor.goUp()		
		Render.cursor(CURSOR_ROW, CURSOR_COLUMN)
		return
	}

	//Go down
	if(keySequence === KEYBOARD_KEYS.MOUSE_DOWN) {
		Editor.goDown()
		Render.cursor(CURSOR_ROW, CURSOR_COLUMN)
		return
	}

	//Enter pressed
	if(keyMeta.sequence === KEYBOARD_KEYS.CARRIAGE_RETURN) {
		Editor.insertNewLine()
		Render.code(EDITOR_BUFFER)
		Render.cursor(CURSOR_ROW, CURSOR_COLUMN)
		return
	}

	//Insert new line by printing text
	if(Editor.state.CURSOR_COLUMN_POSITION === WINDOWS_COLUMNS) {
		Editor.insertNewLineByPrintingText(keyLetter)
		Render.code(Editor.state.TEXT_BUFFER)
		Render.cursor(Editor.state.CURSOR_ROW_POSITION, Editor.state.CURSOR_COLUMN_POSITION)
		return
	}

	//Insert new letter on the end of the line
	if(isCursorOnLineEnd()) {
		Editor.insertTextOnTheEnd(keyLetter)
		Render.line(Editor.state.TEXT_BUFFER[Editor.state.CURSOR_ROW_POSITION])
		return
	}
	
	//Insert new letter on any position on the line
	if(!isCursorOnLineEnd() && !isCursorOnLineStart()) {
		Editor.insertTextOnAnyPosition()
		Render.line(EDITOR_BUFFER[CURSOR_ROW])
		Render.cursor(CURSOR_ROW, CURSOR_COLUMN)
		return
	}
})