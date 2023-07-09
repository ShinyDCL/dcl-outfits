import * as utils from '@dcl-sdk/utils'
import { AudioStream, Transform, engine } from '@dcl/sdk/ecs'
import { sceneMiddle, yOffset } from './resources'

/*
 * Creates one time trigger for starting music when user enters it
 */
export const setupMusic = () => {
  utils.triggers.enableDebugDraw(true)
  const triggerEntity = engine.addEntity()
  Transform.create(triggerEntity)

  utils.triggers.oneTimeTrigger(
    triggerEntity,
    utils.NO_LAYERS,
    utils.LAYER_1,
    [
      {
        type: 'box',
        position: { x: sceneMiddle, y: sceneMiddle + yOffset - 3, z: sceneMiddle },
        scale: { x: 8, y: 2, z: 8 }
      }
    ],
    () => {
      const streamEntity = engine.addEntity()
      AudioStream.create(streamEntity, {
        url: 'https://icecast.ravepartyradio.org/ravepartyradio-192.mp3',
        playing: true,
        volume: 0.8
      })
    }
  )
}
