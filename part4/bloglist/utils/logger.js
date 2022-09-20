const isTesting = process.env.NODE_ENV === "test"

const info = (...params) => {
  if (!isTesting) { console.log(...params) }
}

const error = (...params) => {
  if (!isTesting) { console.error(...params) }
}

module.exports = {
  info, error
}