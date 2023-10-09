import { Entity } from '@dcl/sdk/ecs'

import { hideEntity, showEntity } from '../utils'
import { createSkyBox } from './skybox'

const skyboxFolders = Array.from(Array(9).keys())
const maxIndex = skyboxFolders.length - 1

export class SkyboxManager {
  private currentIndex: number = 0
  private skyboxes: Entity[] = []

  constructor(parent: Entity) {
    skyboxFolders.forEach((folder, index) => {
      this.skyboxes.push(createSkyBox(parent, folder.toString(), index === 0))
    })
  }

  change = (step: number) => {
    // Hide current skybox
    hideEntity(this.skyboxes[this.currentIndex])

    this.currentIndex += step
    if (this.currentIndex > maxIndex) this.currentIndex = 0
    else if (this.currentIndex < 0) this.currentIndex = maxIndex

    // Show next skybox
    showEntity(this.skyboxes[this.currentIndex])
  }
}
