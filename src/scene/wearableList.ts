import { Entity, Transform, engine, executeTask } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { createWearableTile, tileSize } from './wearableTile'
import { getAllWearableDetails } from '../api'

const space = 0.02
const columns = 2

/*
 * Gets wearable data and displays a list of wearables from tiles
 */
export const createWearableList = (parent: Entity, wearables: string[], onCompleted: () => void) => {
  const wearableList = engine.addEntity()
  Transform.create(wearableList, { position: Vector3.create(0, tileSize + space, 0), parent })

  executeTask(async () => {
    const wearableData = await getAllWearableDetails(wearables)
    wearableData?.forEach((item, i) =>
      createWearableTile(
        wearableList,
        Vector3.create(-(tileSize + space) * (i % columns), (tileSize + space) * Math.floor(i / columns)),
        item
      )
    )

    onCompleted()
  })

  return wearableList
}
