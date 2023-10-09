import { AudioSource, engine, Entity, GltfContainer, Transform, TransformType } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

import { models, sounds } from '../resources'
import { addInteraction, playSound } from '../utils'

/*
 * Creates two arrow buttons for switching between skyboxes
 */
export const createArrowButtons = (parent: Entity, onClick: (step: number) => void) => {
  // Next button
  const nextButtonTransform = {
    position: Vector3.create(1, 1.5, 6.5),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    parent
  }
  createButton(nextButtonTransform, 'Next background!', () => onClick(1))

  // Previous button
  const prevButtonTransform = {
    position: Vector3.create(-1, 1.5, 6.5),
    parent
  }
  createButton(prevButtonTransform, 'Previous background!', () => onClick(-1))
}

const createButton = (transform: Partial<TransformType>, hoverText: string, onClick: () => void): Entity => {
  const entity = engine.addEntity()
  GltfContainer.create(entity, { src: models.arrowButton })
  Transform.create(entity, transform)

  AudioSource.create(entity, {
    audioClipUrl: sounds.click,
    playing: false,
    loop: false
  })

  addInteraction(entity, hoverText, () => {
    playSound(entity)
    onClick()
  })

  return entity
}
