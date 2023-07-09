import { Entity, GltfContainer, InputAction, Transform, engine, executeTask, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { getAllWearableDetails } from './api'
import { parseURNs } from './utils'
import { createWearableTile } from './wearableTile'

const tileSize = 0.32
const space = 0.01

export const createDetailsButton = (parent: Entity, wearables: string[]) => {
  let isExpanded = false
  let wearableTiles: Entity

  const nextButton = engine.addEntity()
  GltfContainer.create(nextButton, { src: `models/plusButton.glb` })
  Transform.create(nextButton, {
    position: Vector3.create(-0.7, 0.5, 0.3),
    parent
  })

  pointerEventsSystem.onPointerDown(
    { entity: nextButton, opts: { button: InputAction.IA_POINTER, hoverText: 'Shop outfit!' } },
    () => {
      if (isExpanded) {
        GltfContainer.createOrReplace(nextButton, { src: `models/plusButton.glb` })
        Transform.deleteFrom(wearableTiles)
        isExpanded = false
        return
      }

      if (!isExpanded && wearableTiles) {
        Transform.createOrReplace(wearableTiles, { position: Vector3.create(0, 0.5, 0), parent: nextButton })
        GltfContainer.createOrReplace(nextButton, { src: `models/minusButton.glb` })
        isExpanded = true
        return
      }

      GltfContainer.createOrReplace(nextButton, { src: `models/minusButton.glb` })
      isExpanded = true

      wearableTiles = engine.addEntity()
      Transform.create(wearableTiles, { position: Vector3.create(0, 0.5, 0), parent: nextButton })
      const nftData = parseURNs(wearables)

      executeTask(async () => {
        const wearableData = await getAllWearableDetails(nftData)
        wearableData?.forEach((item, i) =>
          createWearableTile(wearableTiles, Vector3.create(0, (tileSize + space) * i, 0), item)
        )
      })
    }
  )
}
