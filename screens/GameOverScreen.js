import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import DefaultStyles from '../constants/default-styles'

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>You got it bruh</Text>
      <View style={styles.imageContainer}>
        <Image 
        // source={require('../assets/bar.png')} 
        source={{uri: 'https://images.unsplash.com/photo-1436076863939-06870fe779c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80'}} 
        style={styles.image} />
      </View>

      <Text style={DefaultStyles.bodyText}>
        Number of rounds: {props.roundsNumber}
      </Text>
      <Text style={DefaultStyles.bodyText}>Number was: {props.userNumber}</Text>
      <Button title='NEW GAME' onPress={props.onRestart} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

export default GameOverScreen
