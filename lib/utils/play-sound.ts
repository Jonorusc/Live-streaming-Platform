const PlaySound = (soundPath: string, volume = 0.1) => {
  // the sound could be a file or a url
  const audio = new Audio(soundPath)

  audio.currentTime = 0
  audio.volume = volume
  audio.play()
}

export default PlaySound
