const Editor = {
	config: {
		tabsize: 2
	},
	state: {
		TEXT_BUFFER: [""],
		CURSOR_ROW_POSITION: 0,
		CURSOR_COLUMN_POSITION: 0,
	},
	close: function() {
		process.exit(0)
	},
	tab: function() {
		this.TEXT_BUFFER[this.CURSOR_ROW_POSITION] += " ".repeat(this.config.tabsize)
		this.CURSOR_COLUMN_POSITION += this.config.tabsize
	},
	removeCurrentLineAndJumpOnPreivewLine: function() {
		const currentRowValue = this.state.TEXT_BUFFER[this.state.CURSOR_ROW_POSITION]
		//Replace empty line
		this.state.TEXT_BUFFER = [
			...this.state.TEXT_BUFFER.slice(0, this.state.CURSOR_ROW_POSITION), 
			...this.state.TEXT_BUFFER.slice(this.state.CURSOR_ROW_POSITION + 1, this.state.TEXT_BUFFER.length)
		]

		this.state.CURSOR_ROW_POSITION--
		this.state.CURSOR_COLUMN_POSITION = this.state.TEXT_BUFFER[this.state.CURSOR_ROW_POSITION].length
		//Concatenate to strings (from preview and current line)
		this.state.TEXT_BUFFER[this.state.CURSOR_ROW_POSITION] = this.state.TEXT_BUFFER[this.state.CURSOR_ROW_POSITION] + currentRowValue
	},
	removeCharacterFromEndOfTheLine: function() {
		Editor.state.TEXT_BUFFER[Editor.state.CURSOR_ROW_POSITION] = 
			Editor.state.TEXT_BUFFER[Editor.state.CURSOR_ROW_POSITION].substring(0, Editor.state.TEXT_BUFFER[Editor.state.CURSOR_ROW_POSITION] - 1)
		Editor.state.CURSOR_COLUMN_POSITION--
	},
	removeCharacterFromAnywheOfTheLine: function() {
		Editor.state.TEXT_BUFFER[Editor.state.CURSOR_ROW_POSITION] =
			Editor.state.TEXT_BUFFER[Editor.state.CURSOR_ROW_POSITION].substring(0, Editor.state.CURSOR_COLUMN_POSITION - 1) +
			Editor.state.TEXT_BUFFER[Editor.state.CURSOR_ROW_POSITION].substring(Editor.state.CURSOR_COLUMN_POSITION, Editor.state.TEXT_BUFFER[Editor.state.CURSOR_ROW_POSITION].length)
		Editor.state.CURSOR_COLUMN_POSITION--
	},
	goLeft: function() {
		if(!isCursorOnLineStart()) {
			this.state.CURSOR_COLUMN_POSITION--
		}
	},
	goRight: function() {
		if(!isCursorOnLineEnd()) {
			this.state.CURSOR_COLUMN_POSITION++
		}
	},
	goUp: function() {
		if((this.state.CURSOR_ROW_POSITION + 1) === 1) return

		const prevRowLength = this.state.TEXT_BUFFER[this.state.CURSOR_ROW_POSITION - 1]?.length || 0

		this.state.CURSOR_ROW_POSITION--

		//If current row length is bigger then prev one, set the cursor position
		//to the end of the prev line
		if(this.state.CURSOR_COLUMN_POSITION > prevRowLength) {
			this.state.CURSOR_COLUMN_POSITION = prevRowLength - 1
		}
	},
	goDown: function() {
		//If user try to go down but bottom is no more rows
		if(this.state.CURSOR_ROW_POSITION === this.state.TEXT_BUFFER.length - 1) return
				
		const nextRowLength = this.state.TEXT_BUFFER[this.state.CURSOR_ROW_POSITION + 1]?.length || 0

		this.state.CURSOR_ROW_POSITION++

		//If current row length is bigger then next one, set the cursor position
		//to the end of the next line
		if(this.state.CURSOR_COLUMN_POSITION > nextRowLength) {
			this.state.CURSOR_COLUMN_POSITION = nextRowLength - 1
		}
	},
	insertNewLine: function() {
		this.state.CURSOR_ROW_POSITION++
		this.state.TEXT_BUFFER[this.state.CURSOR_ROW_POSITION] = ""
		this.state.CURSOR_COLUMN_POSITION = 0
	},
	insertNewLineByPrintingText: function(letter) {
		this.state.TEXT_BUFFER = [
			...this.state.TEXT_BUFFER.slice(0, this.state.CURSOR_ROW_POSITION === 0 ? 1 : this.state.CURSOR_ROW_POSITION + 1), 
			letter, 
			...this.state.TEXT_BUFFER.slice(this.state.CURSOR_ROW_POSITION + 1, this.state.TEXT_BUFFER.length)
		]
		this.state.CURSOR_ROW_POSITION++
		this.state.CURSOR_COLUMN_POSITION = 1
	},
	insertTextOnTheEnd: function(letter) {
		this.state.TEXT_BUFFER[this.state.CURSOR_ROW_POSITION] += letter
		this.state.CURSOR_COLUMN_POSITION++
	},
	insertTextOnAnyPosition: function(letter) {
		this.state.TEXT_BUFFER[this.state.CURSOR_ROW_POSITION] = 
			this.state.TEXT_BUFFER[this.state.CURSOR_ROW_POSITION].substring(0, this.state.CURSOR_COLUMN_POSITION) +
			letter +
			this.state.TEXT_BUFFER[this.state.CURSOR_ROW_POSITION].substring(this.state.CURSOR_COLUMN_POSITION, this.state.TEXT_BUFFER[this.state.CURSOR_ROW_POSITION].length)
		this.state.CURSOR_COLUMN_POSITION++
	}
}

export function isBufferEmpty() {
	return Editor.state.TEXT_BUFFER.length === 0
}

export function isCurrentLineEmpty () {
	return Editor.state.TEXT_BUFFER[Editor.state.CURSOR_ROW_POSITION].length === 0
}

export function isCursorOnLineStart() {
	return (Editor.state.CURSOR_COLUMN_POSITION + 1) === 1
}

export function isCursorOnLineEnd() {
	return Editor.state.CURSOR_COLUMN_POSITION === Editor.state.TEXT_BUFFER[Editor.state.CURSOR_ROW_POSITION].length
}

export default Editor