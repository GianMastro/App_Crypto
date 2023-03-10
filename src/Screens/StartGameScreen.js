import { StyleSheet, Text, View, useState, TouchableWithoutFeedback, Button } from 'react-native'
import React from 'react'
import Input from '../Components/Input'
import NumberContainer from '../Components/NumberContainer'

const StartGameScreen = () => {

    const [enteredValue, setEnteredValue] = React.useState('')
    const [confirmed, setConfirmed] = React.useState(false)
    const [selectedNumber, setSelectedNumber] = React.useState()

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmedInputHandler = inputText => {
        const chosenNumber = parseInt(enteredValue)
        if (chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99){
            return
        }
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
    }

    const confirmedOutput = confirmed ? <Text>Numero elegido: {selectedNumber}</Text>: null;

    return (
        <TouchableWithoutFeedback onpress={() => {
            Keyboard.dismiss()
        }}>
        <View style={styles.container}>
            <Text style={styles.title}>Comenzar juego</Text>
            <Card style={styles.inputcontainer}>
                <Text style={styles.inputDescriptionText}>Elija un número</Text>
                <Input style={styles.input}
                blurOnSubmit
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='number-pad'
                maxLength={2}
                value={enteredValue}
                onchangeText={numberInputHandler}
            />
            <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                    <Button title='Limpiar' onPress={resetInputHandler} color={COLORS.accent}/>
                </View>
                <View style={styles.button}>
                <Button title='Confirmar' onPress={confirmedInputHandler} color={COLORS.primary}/>
                </View>
            </View>
            </Card>
            {confirmed &&
                <Card>
                    <Text>Tu seleccion</Text>
                    <NumberContainer>{selectedNumber}</NumberContainer>
                    <Button title='Iniciar juego'/>
                </Card>
            }
        </View>
        </TouchableWithoutFeedback>
    )
}

export default StartGameScreen

const styles = StyleSheet.create({})