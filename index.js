import _input from "node:readline"

import Render from "./Render/Render.core.js"

import {
	BACKSPACE,
	CARRIAGE_RETURN,
	MOUSE_DOWN,
	MOUSE_LEFT,
	MOUSE_RIGHT,
	MOUSE_UP,
//----------------------
	MAX_EDITOR_BUFFER_SIZE,
	LEFT_PADDING,
	WINDOWS_COLUMNS,
	WINDOWS_ROWS
} from "./const.core.js"

export let CURSOR_ROW = 1
export let CURSOR_COLUMN = LEFT_PADDING
export let CURSOR_BUFFER_ROW = 0
export let EDITOR_BUFFER = [
	"function some_func() {",
	"    console.log(\"Hello World!\")",
	"}"
]

_input.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
console.clear()

Render.code(EDITOR_BUFFER)
Render.cursor(CURSOR_ROW, CURSOR_COLUMN)

process.stdin.on("keypress", (word, keyMeta) => {
	if(keyMeta.name === "c" && keyMeta.ctrl) {
		process.exit(0)
	}

	if(keyMeta.sequence === BACKSPACE) {
		if(CURSOR_COLUMN >= EDITOR_BUFFER[CURSOR_BUFFER_ROW]?.length) {
			//Remove from the end
			EDITOR_BUFFER[CURSOR_BUFFER_ROW] = EDITOR_BUFFER[CURSOR_BUFFER_ROW].substring(0, EDITOR_BUFFER[CURSOR_BUFFER_ROW].length - 1)
		} else if(CURSOR_COLUMN > 0) {
			//Remove from somewhere in the text
			EDITOR_BUFFER[CURSOR_BUFFER_ROW] = 
				EDITOR_BUFFER[CURSOR_BUFFER_ROW].substring(0, CURSOR_COLUMN - 1) + 
				EDITOR_BUFFER[CURSOR_BUFFER_ROW].substring(CURSOR_COLUMN, EDITOR_BUFFER[CURSOR_BUFFER_ROW].length)
		}

		if(EDITOR_BUFFER[CURSOR_BUFFER_ROW]?.length === 0) {
			EDITOR_BUFFER = [...EDITOR_BUFFER.slice(0, CURSOR_BUFFER_ROW - 1), ...EDITOR_BUFFER.slice(CURSOR_BUFFER_ROW + 1, EDITOR_BUFFER.length)]
			CURSOR_BUFFER_ROW--
			CURSOR_ROW--
		}

		CURSOR_COLUMN--

		Render.line(EDITOR_BUFFER[CURSOR_BUFFER_ROW])
		Render.cursor(CURSOR_ROW, CURSOR_COLUMN)
		return
	}

	if(keyMeta.sequence === MOUSE_LEFT) {
		if(!CURSOR_COLUMN) return

		CURSOR_COLUMN--

		Render.cursor(CURSOR_ROW, CURSOR_COLUMN)
		return
	}

	if(keyMeta.sequence === MOUSE_RIGHT) {
		if(EDITOR_BUFFER[CURSOR_BUFFER_ROW].length < CURSOR_COLUMN) return

		CURSOR_COLUMN++
			
		Render.cursor(CURSOR_ROW, CURSOR_COLUMN)
		return
	}

	if(keyMeta.sequence === MOUSE_UP) {
		if(CURSOR_BUFFER_ROW - 1 === -1) return

		const prevRowLength = EDITOR_BUFFER[CURSOR_BUFFER_ROW - 1]?.length || 0

		CURSOR_ROW--
		CURSOR_BUFFER_ROW--

		//If current row length is bigger then prev one, set the cursor position
		//to the end of the prev line
		if(CURSOR_COLUMN <= prevRowLength) {
			Render.cursor(CURSOR_ROW, CURSOR_COLUMN)
			return
		}

		CURSOR_COLUMN = prevRowLength
		Render.cursor(CURSOR_ROW, CURSOR_COLUMN)
		return
	}

	if(keyMeta.sequence === MOUSE_DOWN) {
		//If user try to go down but bottom is no more rows
		if((CURSOR_BUFFER_ROW + 1) >= EDITOR_BUFFER.length) return
				
		const nextRowLength = EDITOR_BUFFER[CURSOR_BUFFER_ROW + 1]?.length || 0

		CURSOR_ROW++
		CURSOR_BUFFER_ROW++

		//If current row length is bigger then next one, set the cursor position
		//to the end of the next line
		if(CURSOR_COLUMN <= nextRowLength) {
			Render.cursor(CURSOR_ROW, CURSOR_COLUMN)
			return
		}
			
		CURSOR_COLUMN = nextRowLength
		Render.cursor(CURSOR_ROW, CURSOR_COLUMN)
		return
	}
})