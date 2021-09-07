import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import StartGameScreen from './StartGameScreen'

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen} >
      <Text>You got it bruh</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default GameOverScreen
