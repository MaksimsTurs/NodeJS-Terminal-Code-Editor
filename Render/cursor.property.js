export default function cursor(ROW, COLUMN) {
  process.stdout.write(`\u001b[${ROW};${COLUMN}H`)
}