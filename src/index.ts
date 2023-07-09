import { engine, executeTask, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { models, sceneMiddle, yOffset } from './resources'
import { movePlayerTo } from '~system/RestrictedActions'
import { SkyboxManager } from './skyboxManager'
import { createArrowButtons } from './arrowButtons'
import { createNPCs } from './createNPCs'
import { getUserData } from '~system/UserIdentity'
import { getUserOutfits, getUserProfile } from './api'
import { setupUi } from './setupUi'
import { setupMusic } from './setupMusic'

export function main() {
  const scene = engine.addEntity()
  Transform.create(scene, {
    position: Vector3.create(sceneMiddle, sceneMiddle + yOffset, sceneMiddle)
  })

  const platform = engine.addEntity()
  GltfContainer.create(platform, { src: models.platform })
  Transform.create(platform, {
    position: Vector3.create(0, -3, 0),
    parent: scene
  })

  const skyboxManager = new SkyboxManager(scene)
  createArrowButtons(platform, skyboxManager.next, skyboxManager.previous)

  setupUi((address: string) => {
    executeTask(async () => {
      const user = await getUserProfile(address)
      const outfits = await getUserOutfits(address)

      if (outfits) createNPCs(platform, outfits, user?.name)
    })
  })

  setupMusic()

  executeTask(async () => {
    const userData = await getUserData({})

    if (userData?.data) {
      const { userId, displayName } = userData.data
      const outfits = await getUserOutfits(userId)
      if (outfits) createNPCs(platform, outfits, displayName)
    }
  })

  movePlayerTo({ newRelativePosition: Vector3.create(sceneMiddle, sceneMiddle + yOffset, sceneMiddle - 5) })
}
