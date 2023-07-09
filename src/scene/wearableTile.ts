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
import { Wearable } from '../api'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { openExternalUrl } from '~system/RestrictedActions'
import { models } from '../resources'
import { marketplaceUrl } from '../config'

export const tileSize = 0.4
export const tileImageSize = tileSize * 0.92

/*
 * Creates a tile for displaying wearable thumbnail
 */
export const createWearableTile = (parent: Entity, position: Vector3.MutableVector3, wearable: Wearable) => {
  const { thumbnail, name, url } = wearable
  const tile = engine.addEntity()
  GltfContainer.create(tile, { src: models.tile })
  Transform.create(tile, { position, parent })

  const tileImage = engine.addEntity()
  Transform.create(tileImage, {
    position: Vector3.create(0, 0, 0.03),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    scale: Vector3.create(tileImageSize, tileImageSize, tileImageSize),
    parent: tile
  })
  MeshRenderer.setPlane(tileImage)
  Material.setBasicMaterial(tileImage, { texture: Material.Texture.Common({ src: thumbnail }) })

  pointerEventsSystem.onPointerDown({ entity: tile, opts: { button: InputAction.IA_POINTER, hoverText: name } }, () =>
    openExternalUrl({ url: `${marketplaceUrl}${url}` })
  )
}
