import { engine, GltfContainer, Transform, pointerEventsSystem, InputAction, Entity } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'

export const createArrowButtons = (parent: Entity, onClickNext: () => void, onClickPrev: () => void) => {
  const nextButton = engine.addEntity()
  GltfContainer.create(nextButton, { src: `models/arrowButton.glb` })
  Transform.create(nextButton, {
    position: Vector3.create(1, 1.5, 6.5),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    parent
  })

  pointerEventsSystem.onPointerDown(
    { entity: nextButton, opts: { button: InputAction.IA_POINTER, hoverText: 'Next background!' } },
    onClickNext
  )

  const prevButton = engine.addEntity()
  GltfContainer.create(prevButton, { src: `models/arrowButton.glb` })
  Transform.create(prevButton, {
    position: Vector3.create(-1, 1.5, 6.5),
    parent
  })

  pointerEventsSystem.onPointerDown(
    { entity: prevButton, opts: { button: InputAction.IA_POINTER, hoverText: 'Previous background!' } },
    onClickPrev
  )
}
