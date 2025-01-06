//TODO: Make it work
export default function linenumbers(buffer) {
	let index = 0
	let bufferLength = buffer.length

	while(index < bufferLength) {
		console.log(`${index} |`)
		index++
	}
}