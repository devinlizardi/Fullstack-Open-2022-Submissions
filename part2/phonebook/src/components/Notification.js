import React from "react";

const Notification = ({ message, isError }) => {
  const notifStyle = {
    color: isError ? 'red': 'green',
    fontSize: 16,
    fontStyle: 'italic',
    fontFamily: 'sans-serif'
  }

  if (message === null) return null

  return (
    <p style={notifStyle}>
      {message}
    </p>
  )
}

export default Notification