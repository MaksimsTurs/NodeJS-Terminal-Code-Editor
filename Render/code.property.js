export default function code(buffer) {
	let index = 0
	let bufferLength = buffer.length

	while(index < bufferLength) {
		console.log(buffer[index])
		index++
	}
}