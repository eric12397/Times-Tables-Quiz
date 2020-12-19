export const toSeconds = (time) => {
  const seconds = Math.floor((time / 1000) % 60);
  const milliseconds = parseInt(time % 1000);
  
  return seconds + "." + milliseconds

}

export const toHrMinSec = (time) => {
  const seconds = parseInt((time / 1000) % 60);
  const minutes = parseInt((time / (1000 * 60)) % 60);
  const hours = parseInt((time / (1000 * 60 * 60)) % 24);
  
  return `${hours} hr ${minutes} min ${seconds} sec`
}


