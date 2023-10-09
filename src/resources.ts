import { Color4 } from '@dcl/sdk/math'

export const parcelCount = 3 // 3 rows, 3 columns
export const parcelSize = 16
export const sceneSize = parcelCount * parcelSize
export const sceneMiddle = sceneSize / 2
export const yOffset = 0.1

export const models = {
  arrowButton: 'models/arrowButton.glb',
  button: 'models/button.glb',
  plusSign: 'models/plusSign.glb',
  minusSign: 'models/minusSign.glb',
  loading: 'models/loading.glb',
  tile: 'models/tile.glb',
  platform: 'models/platform.glb',
  text: 'models/text.glb'
} as const

export const sounds = {
  click: 'sounds/click.mp3'
} as const

export const colors = {
  blue: Color4.create(0, 0, 1, 0.8),
  pink: Color4.create(1, 0, 1, 0.8),
  black: Color4.create(0, 0, 0, 0.8)
} as const
