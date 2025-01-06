import { MIN_CURSOR_POSITION } from "../Editor/const.core.js"

export default function cursor(ROW, COLUMN) {
	ROW = ROW + MIN_CURSOR_POSITION
	COLUMN = COLUMN + MIN_CURSOR_POSITION
  process.stdout.write(`\u001b[${ROW};${COLUMN}H`)
}