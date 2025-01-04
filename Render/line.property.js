export default function line(line) {
	process.stdout.clearLine(0)
	process.stdout.cursorTo(0)
	process.stdout.write(line)
}