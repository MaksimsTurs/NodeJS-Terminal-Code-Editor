export default function code(buffer) {
	console.clear()
	
	let index = 0
	let bufferLength = buffer.length

	while(index < bufferLength) {
		console.log(buffer[index])
		index++
	}
}