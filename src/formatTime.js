function formatTime(time) {
  let seconds = Math.floor((time / 1000) % 60);
  let milliseconds = parseInt(time % 1000);
  
  return {
    seconds,
    milliseconds
  };

}

export default formatTime