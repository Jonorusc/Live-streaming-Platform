import { CURRENTUSER } from '@/actions/user'

export const generateUserBackgroundImage = async (
  username: string,
  user_color?: string
): Promise<string> => {
  if (!username) return ''
  const canvas = document.createElement('canvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  canvas.width = window.innerWidth
  canvas.height = 150

  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}70`

  const color = user_color || randomColor

  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const textColor = 'rgba(211, 211, 211, 0.4)'
  ctx.fillStyle = textColor
  ctx.font = 'bold 70px Arial'

  let currentPosition1 = 0
  while (currentPosition1 < canvas.width) {
    ctx.fillText(username, currentPosition1, canvas.height / 2 - 20)
    currentPosition1 += ctx.measureText(username).width + 40
  }

  let currentPosition2 = -60
  while (currentPosition2 < canvas.width) {
    ctx.fillText(username, currentPosition2, canvas.height - 20)
    currentPosition2 += ctx.measureText(username).width + 40
  }
  const imageDataURL = canvas.toDataURL()

  return imageDataURL
}

// see how I created that: https://devbylucas.vercel.app/project/dynamic-username-background

export const toDataUrl = (url: string, callback: (data: string) => void) => {
  var xhr = new XMLHttpRequest()
  xhr.onload = function () {
    var reader = new FileReader()
    reader.onloadend = function () {
      callback(reader.result as string)
    }
    reader.readAsDataURL(xhr.response)
  }
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.send()
}
