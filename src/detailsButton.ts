import { Entity, GltfContainer, InputAction, PointerEvents, Transform, engine, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { models } from './resources'
import { createWearableList } from './wearableList'

/*
 * Creates expandable and collapsable details button by pressing which outfit wearables list gets displayed or hidden
 */
export const createDetailsButton = (parent: Entity, wearables: string[]) => {
  let isExpanded = false
  let buttonSign: Entity
  let wearableList: Entity

  const button = engine.addEntity()
  GltfContainer.create(button, { src: models.button })
  Transform.create(button, {
    position: Vector3.create(-0.5, 0.5, 0.7),
    parent
  })

  buttonSign = engine.addEntity()
  GltfContainer.create(buttonSign, { src: models.plusSign })
  Transform.create(buttonSign, { parent: button })

  const onPointerDown = () => {
    // Collapse wearable list if it is expanded
    if (isExpanded) {
      const transform = Transform.getMutableOrNull(wearableList)
      if (transform) transform.scale = Vector3.create(0, 0, 0)

      const hoverFeedback = PointerEvents.getMutableOrNull(button)
      if (hoverFeedback?.pointerEvents?.[0]?.eventInfo) hoverFeedback.pointerEvents[0].eventInfo.hoverText = 'Expand'

      GltfContainer.createOrReplace(buttonSign, { src: models.plusSign })
      isExpanded = false
      return
    }

    // Expand wearable list without loading data if wearable list has already been created
    if (!isExpanded && wearableList) {
      const transform = Transform.getMutableOrNull(wearableList)
      if (transform) transform.scale = Vector3.create(1, 1, 1)

      const hoverFeedback = PointerEvents.getMutableOrNull(button)
      if (hoverFeedback?.pointerEvents?.[0]?.eventInfo) hoverFeedback.pointerEvents[0].eventInfo.hoverText = 'Collapse'

      GltfContainer.createOrReplace(buttonSign, { src: models.minusSign })
      isExpanded = true
      return
    }

    // Get data and create wearable list
    PointerEvents.deleteFrom(button)
    GltfContainer.createOrReplace(buttonSign, { src: models.loading })

    wearableList = createWearableList(button, wearables, () => {
      GltfContainer.createOrReplace(buttonSign, { src: models.minusSign })
      pointerEventsSystem.onPointerDown(
        { entity: button, opts: { button: InputAction.IA_POINTER, hoverText: 'Collapse' } },
        onPointerDown
      )
      isExpanded = true
    })
  }

  pointerEventsSystem.onPointerDown(
    { entity: button, opts: { button: InputAction.IA_POINTER, hoverText: 'Expand' } },
    onPointerDown
  )
}
