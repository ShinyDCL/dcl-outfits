import { openExternalUrl } from '~system/RestrictedActions'

import { engine, Entity, GltfContainer, Material, MeshRenderer, Transform } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

import { Wearable } from '../api'
import { marketplaceUrl } from '../config'
import { models } from '../resources'
import { addInteraction } from '../utils'

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

  addInteraction(tile, name, () => {
    openExternalUrl({ url: `${marketplaceUrl}${url}` })
  })
}
