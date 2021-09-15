import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'
import TextFont from '../components/TextFont'

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

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <TextFont>#{numOfRound}</TextFont>
    <TextFont>{value}</TextFont>
  </View>
)

const GameScreen = (props) => {
  const initialGuess = generateNumber(1, 100, props.userChoice)
  const [guess, setGuess] = useState(initialGuess)
  const [pastGuesses, setPastGuesses] = useState([initialGuess])
  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const { userChoice, onGameOver } = props

  useEffect(() => {
    if (guess === userChoice) {
      onGameOver(pastGuesses.length)
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
      currentLow.current = guess + 1
    }
    const nextNumber = generateNumber(
      currentLow.current,
      currentHigh.current,
      guess
    )
    setGuess(nextNumber)
    // setRounds((currentRounds) => currentRounds + 1)
    setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses])
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
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
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
  listContainer: {
    flex: 1,
    width: '80%',
  },
  list: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '60%',
  },
})

export default GameScreen
