import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'
import DefaultStyles from '../constants/default-styles'

const generateNumber = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const randomNumber = Math.floor(Math.random() * (max - min)) + min
  if (randomNumber === exclude) {
    return generateNumber(min, max, exclude)
  } else {
    return randomNumber
  }
}

const GameScreen = (props) => {
  const [guess, setGuess] = useState(generateNumber(1, 100, props.userChoice))
  const [rounds, setRounds] = useState(0)
  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const { userChoice, onGameOver } = props

  useEffect(() => {
    if (guess === userChoice) {
      onGameOver(rounds)
    }
  }, [guess, userChoice, onGameOver])

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && guess < props.userChoice) ||
      (direction === 'greater' && guess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'This is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ])
      return
    }
    if (direction === 'lower') {
      currentHigh.current = guess
    } else {
      currentLow.current = guess
    }
    const nextNumber = generateNumber(
      currentLow.current,
      currentHigh.current,
      guess
    )
    setGuess(nextNumber)
    setRounds((currentRounds) => currentRounds + 1)
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title} >Opponents's Guess</Text>
      <NumberContainer>{guess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title='LOWER' onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button
          title='GREATER'
          onPress={nextGuessHandler.bind(this, 'greater')}
        />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
})

export default GameScreen
