import {
  AudioSource,
  Entity,
  GltfContainer,
  InputAction,
  PointerEvents,
  pointerEventsSystem,
  Transform
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

export const showEntity = (entity: Entity) => {
  const transform = Transform.getMutable(entity)
  transform.scale = Vector3.create(1, 1, 1)
}

export const hideEntity = (entity: Entity) => {
  const transform = Transform.getMutable(entity)
  transform.scale = Vector3.create(0, 0, 0)
}

export const addInteraction = (entity: Entity, hoverText: string, onClick: () => void) => {
  pointerEventsSystem.onPointerDown({ entity, opts: { button: InputAction.IA_POINTER, hoverText } }, onClick)
}

export const removeInteraction = (entity: Entity) => {
  pointerEventsSystem.removeOnPointerDown(entity)
}

export const updateButtonFeedback = (entity: Entity, text: string) => {
  const hoverFeedback = PointerEvents.getMutable(entity)
  if (hoverFeedback?.pointerEvents?.[0]?.eventInfo) hoverFeedback.pointerEvents[0].eventInfo.hoverText = text
}

export const playSound = (entity: Entity) => {
  const audioSource = AudioSource.getMutable(entity)
  audioSource.playing = true
}

export const updateModel = (entity: Entity, model: string) => {
  const gltfContainer = GltfContainer.getMutable(entity)
  gltfContainer.src = model
}
