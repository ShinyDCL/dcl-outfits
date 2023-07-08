import ReactEcs, { Button, Input, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'

const colors = {
  blue: Color4.create(0, 0, 1, 0.8),
  pink: Color4.create(1, 0, 1, 0.8),
  black: Color4.create(0, 0, 0, 0.8)
} as const

export const setupUi = (onSubmitAddress: (address: string) => void) => {
  let isInputVisible = false
  let currentInputValue = ''

  ReactEcsRenderer.setUiRenderer(() => (
    <UiEntity
      uiTransform={{
        width: 1,
        height: 1,
        positionType: 'absolute',
        position: { right: 10, bottom: 10 }
      }}
    >
      <UiEntity
        uiTransform={{
          width: 300,
          height: 100,
          positionType: 'absolute',
          position: { right: 0, bottom: 0 },
          padding: 10
        }}
        uiBackground={{ color: colors.pink }}
      >
        <Button
          value="Click here to check\n your friends outfits!"
          uiTransform={{
            width: 280,
            height: 80
          }}
          uiBackground={{ color: colors.black }}
          fontSize={20}
          textAlign="middle-center"
          onMouseDown={() => (isInputVisible = true)}
        />
      </UiEntity>
      <UiEntity
        uiTransform={{
          width: 600,
          height: 100,
          positionType: 'absolute',
          position: { right: 310, bottom: 0 },
          display: isInputVisible ? 'flex' : 'none',
          flexDirection: 'column',
          padding: 10
        }}
        uiBackground={{ color: colors.blue }}
      >
        <Label
          uiTransform={{
            width: 580,
            height: 40
          }}
          value="Enter address starting with 0x"
          fontSize={20}
        />
        <UiEntity
          uiTransform={{
            width: 580,
            height: 40,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Input
            uiTransform={{
              width: 490,
              height: 40
            }}
            uiBackground={{ color: colors.black }}
            fontSize={20}
            placeholder={'Type here'}
            placeholderColor={Color4.White()}
            color={Color4.White()}
            onChange={(e) => (currentInputValue = e)}
          />
          <Button
            value="Submit"
            uiTransform={{
              width: 80,
              height: 40
            }}
            uiBackground={{ color: colors.black }}
            fontSize={20}
            textAlign="middle-center"
            onMouseDown={() => {
              isInputVisible = false
              onSubmitAddress(currentInputValue)
            }}
          />
        </UiEntity>
      </UiEntity>
    </UiEntity>
  ))
}
