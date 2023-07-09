import {
  Entity,
  GltfContainer,
  InputAction,
  Material,
  MeshRenderer,
  Transform,
  engine,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { Wearable } from './api'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { openExternalUrl } from '~system/RestrictedActions'
import { marketplaceUrl } from './resources'

const tileSize = 0.32
const tileImageSize = tileSize * 0.8

export const createWearableTile = (parent: Entity, position: Vector3.MutableVector3, wearable: Wearable) => {
  const tile = engine.addEntity()
  GltfContainer.create(tile, { src: `models/tile.glb` })
  Transform.create(tile, { position, parent })

  const thumbnail = engine.addEntity()
  Transform.create(thumbnail, {
    position: Vector3.create(0, 0, 0.03),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    scale: Vector3.create(tileImageSize, tileImageSize, tileImageSize),
    parent: tile
  })
  MeshRenderer.setPlane(thumbnail)
  Material.setBasicMaterial(thumbnail, { texture: Material.Texture.Common({ src: wearable.thumbnail }) })

  pointerEventsSystem.onPointerDown(
    { entity: tile, opts: { button: InputAction.IA_POINTER, hoverText: wearable.name } },
    () => openExternalUrl({ url: `${marketplaceUrl}${wearable.url}` })
  )
}
