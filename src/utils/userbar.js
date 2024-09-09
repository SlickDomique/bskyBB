import userbarGenerator from 'userbar-generator'

const lerp = (x, y, a) => x * (1 - a) + y * a

const generateColorArray = (seed) => {
  const num = seed.split('').map((char) => char.charCodeAt(0))
  const colorCount = (num.reduce((acc, val) => acc + val, 0) % 5) + 2

  const colors = []
  for (let i = 0; i < colorCount; i++) {
    const h = lerp(0, 360, Math.sin(num[i]) * Math.cos(num[i + 1]))
    const s = lerp(40, 100, num[i * 2] / 128)
    const l = lerp(40, 80, num[i * 3] / 150)
    colors.push(`hsl(${h}, ${s}%, ${l}%)`)
  }
  return colors
}

const getValueFromArray = (seed, offset, arr) => {
  const num = `${seed.substr(0, 2 + offset)}${seed.substr(-(2 + offset))}`
    .split('')
    .map((char) => char.charCodeAt(0))
    .reduce((acc, val) => acc + val, 0)

  const modulo = arr.length > 2 ? num % arr.length : num % 2
  return arr[modulo]
}

const getBinary = (seed, offset = 0) => {
  const num = `${seed.substr(0, 2 + offset)}${seed.substr(-(2 + offset))}`
    .split('')
    .map((char) => char.charCodeAt(0))
    .reduce((acc, val) => acc + val + offset, 0)
  return !!(num % 2)
}

export const getUserbar = async (label) => {
  console.log(label, label.cid)
  const storedImage = localStorage.getItem(`label_userbar_1.0_${label.cid}`)
  if (storedImage) {
    return storedImage
  }

  const seed = `${label.val}${label.uri}`
  try {
    console.log(getValueFromArray(seed, 3, ['plain', 'gradient']))
    const image = await userbarGenerator({
      text: label.val,
      textAlign: getValueFromArray(seed, 1, ['left', 'center', 'right']),
      pattern: getValueFromArray(seed, 2, ['stripes', 'none']),
      topShadow: getBinary(seed),
      background: {
        type: getValueFromArray(seed, 3, ['plain', 'gradient']),
        positionX: -10,
        positionY: -10,
        endPositionX: 340,
        endPositionY: 30,
        colors: generateColorArray(seed),
      },
    })
    return image
  } catch (e) {
    console.error(e)
  }
  return null
}
