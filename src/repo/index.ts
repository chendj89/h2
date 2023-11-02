const createRect = (
  { left = 0, col = 1, top = 0, row = 1 },
  { gap = 4, size = 40, border = 10, isContainer = false }
) => {
  let oLeft = left * (gap + size)
  let oTop = top * (gap + size)
  let oWidth = col * size + (col - 1) * gap
  let oHeight = row * size + (row - 1) * gap
  let result = {
    left: oLeft,
    top: oTop,
    width: oWidth,
    height: oHeight
  }
  if (isContainer) {
    result.width += border * 2
    result.height += border * 2
  }
  return result
}

let grid = [
  {
    name: '九转灵山',
    icon: 'https://avatars.githubusercontent.com/u/105529957',
    link: 'https://chendj89.github.io',
    extend: {
      type: 'user',
      iconType: 'http'
    },
    rect: {
      left: 1,
      top: 1,
      col: 4,
      row: 1
    },
    children: [
      {
        name: '双刃战意',
        icon: '',
        link: '',
        rect: {
          left: 0,
          rop: 0,
          col: 1,
          row: 1
        }
      }
    ]
  }
]
const container = {
  rect: {
    left: 0,
    top: 0,
    col: 7,
    row: 3
  }
}
console.log(createRect(grid[0].rect, {}))
console.log(createRect(container.rect, { isContainer: true, size: 40 }))
