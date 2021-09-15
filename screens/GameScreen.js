import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'

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
      <Text style={DefaultStyles.title}>Opponents's Guess</Text>
      <NumberContainer>{guess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
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
    width: 400,
    maxWidth: '90%',
  },
})

export default GameScreen
