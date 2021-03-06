import React from 'react'
import { Text, StyleSheet } from 'react-native'

const TextFont = (props) => {
  return (
    <Text style={{ ...styles.body, ...props.style }}>{props.children}</Text>
  )
}
const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans',
  },
})

export default TextFont
