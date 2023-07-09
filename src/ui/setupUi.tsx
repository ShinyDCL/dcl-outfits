import ReactEcs, { Button, Input, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { colors } from '../resources'
import { Message } from './message'

export const setupUi = (onSubmitAddress: (address: string) => void) => {
  let isInputVisible = false
  let currentInputValue = ''

  ReactEcsRenderer.setUiRenderer(() => (
    <UiEntity
      uiTransform={{
        width: 0,
        height: 0,
        positionType: 'absolute',
        position: { top: 5, right: '50%' }
      }}
    >
      <UiEntity
        uiTransform={{
          width: 600,
          height: 50,
          padding: 5,
          positionType: 'absolute',
          position: { top: 0, right: -300 }
        }}
        uiBackground={{ color: colors.pink }}
      >
        <Button
          value="Click here to check your friends outfits!"
          uiTransform={{
            width: 590,
            height: 40
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
          position: { top: 55, right: -300 },
          display: isInputVisible ? 'flex' : 'none',
          padding: 5
        }}
        uiBackground={{ color: colors.blue }}
      >
        <UiEntity
          uiTransform={{
            width: 590,
            height: 90,
            display: 'flex',
            flexDirection: 'column',
            padding: 5
          }}
          uiBackground={{ color: colors.black }}
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
                width: 480,
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
                width: 95,
                height: 40
              }}
              uiBackground={{ color: colors.black }}
              fontSize={20}
              textAlign="middle-center"
              onMouseDown={() => {
                isInputVisible = false
                onSubmitAddress(currentInputValue.trim())
              }}
            />
          </UiEntity>
        </UiEntity>
      </UiEntity>
      <Message />
    </UiEntity>
  ))
}
