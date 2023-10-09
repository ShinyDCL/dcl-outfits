import { AudioSource, engine, Entity, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

import { models, sounds } from '../resources'
import {
  addInteraction,
  hideEntity,
  playSound,
  removeInteraction,
  showEntity,
  updateButtonFeedback,
  updateModel
} from '../utils'
import { createWearableList } from './wearableList'

enum Actions {
  Expand = 'Expand',
  Collapse = 'Collapse'
}

/*
 * Creates expandable and collapsable details button by pressing which outfit wearables list gets displayed or hidden
 */
export const createDetailsButton = (parent: Entity, wearables: string[]) => {
  let isExpanded = false
  let wearableList: Entity

  const button = engine.addEntity()
  GltfContainer.create(button, { src: models.button })
  Transform.create(button, { position: Vector3.create(-0.5, 0.5, 0.7), parent })

  AudioSource.create(button, {
    audioClipUrl: sounds.click,
    playing: false,
    loop: false
  })

  const buttonSign = engine.addEntity()
  GltfContainer.create(buttonSign, { src: models.plusSign })
  Transform.create(buttonSign, { parent: button })

  const onPointerDown = () => {
    playSound(button)

    if (isExpanded) {
      // Collapse wearable list
      hideEntity(wearableList)
      updateButtonFeedback(button, Actions.Expand)
      updateModel(buttonSign, models.plusSign)
    } else {
      if (wearableList) {
        // If wearable list already exists, then expand it
        showEntity(wearableList)
        updateButtonFeedback(button, Actions.Collapse)
        updateModel(buttonSign, models.minusSign)
      } else {
        // If wearable list doesn't exist, it needs to be created
        // Remove interaction from button while wearable list is loading
        removeInteraction(button)
        updateModel(buttonSign, models.loading)

        wearableList = createWearableList(button, wearables, () => {
          // Add back interaction when wearable list has been created
          addInteraction(button, Actions.Collapse, onPointerDown)
          updateModel(buttonSign, models.minusSign)
        })
      }
    }

    isExpanded = !isExpanded
  }

  addInteraction(button, Actions.Expand, onPointerDown)
}
