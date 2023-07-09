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
  platform: 'models/platform.glb'
} as const
