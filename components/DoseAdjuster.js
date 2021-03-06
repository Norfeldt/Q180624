import debounce from 'lodash/debounce'
import React from 'react'
import { View } from 'react-native'
import Slider from '@react-native-community/slider'
import Colors from '../constants/Colors'
import { ContextConsumer } from '../Context'
import Text from './basic/Text'

export default function DoseAdjuster(props) {
    return (
      <ContextConsumer>
        {({ getDose, getDoseRange, setDose, prescriptionDose }) => {
          const value = getDose()
          const { minDose, maxDose } = getDoseRange()
          const minPreDose =
            (prescriptionDose[0] /
              prescriptionDose.reduce((acc, val) => acc + val, 0)) *
            maxDose

          const maxPreDose =
            ((prescriptionDose[0] + prescriptionDose[1]) /
              prescriptionDose.reduce((acc, val) => acc + val, 0)) *
            maxDose

          return (
            <View>
              <Text style={{ flex: 1, marginTop: 10 }}>
                {`Dose: ${value} mg`}
              </Text>

              <View
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
              >
                <Text style={{ flex: 7, fontSize: 12, marginTop: 3 }}>
                  {minDose.toFixed(0)}
                </Text>
                <Slider
                  style={{ flex: 70, height: 60, alignSelf: 'stretch' }}
                  trackStyle={{
                    height: 40,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: Colors.passive,
                    backgroundColor: Colors.passiveBG,
                  }}
                  minimumTrackTintColor={
                    value > minPreDose && value < maxPreDose
                      ? Colors.positive
                      : Colors.warning
                  }
                  minimumValue={minDose}
                  maximumValue={maxDose}
                  value={value}
                  step={1}
                  onValueChange={debounce((value) => setDose(value), 25)}
                />
                <Text style={{ flex: 7, fontSize: 12, marginTop: 3 }}>
                  {maxDose.toFixed(0)}
                </Text>
              </View>
            </View>
          )
        }}
      </ContextConsumer>
    )
}
