export const WINDOWS_ROWS = process.stdout.rows
export const WINDOWS_COLUMNS = process.stdout.columns

export const MIN_CURSOR_POSITION = 1

export const KEYBOARD_KEYS = {
	CARRIAGE_RETURN: "\r",
	BACKSPACE: "\b",
	TAB: "\t",
	MOUSE_UP: "\x1B[A",
	MOUSE_DOWN: "\x1B[B",
	MOUSE_LEFT: "\x1B[D",
	MOUSE_RIGHT: "\x1B[C"
}