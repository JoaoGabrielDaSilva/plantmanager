import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    KeyboardAvoidingView, 
    Platform, 
    Keyboard,
    Alert,
} from 'react-native'

import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function UserIdentification() {

    const navigation = useNavigation()

    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const [name, setName] = useState<string>()
    const [error, setError] = useState<boolean>(false)

    function handleInputBlur() {
        setIsFocused(false)
        setIsFilled(!!name)
    }

    function handleInputFocus() {
        setIsFocused(true)
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value)
        setName(value)
    }

    async function handleNavigate() {

        if (!name) {
            setError(true)
            return
        }

        try {

            await AsyncStorage.setItem('@plantmanager:user', name)
            setError(false)
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado!',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            })
        }catch {
            Alert.alert("Não foi possível salvar o seu nome. :(")
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            > 
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                {isFilled ? '😄' : '😃'}
                                </Text>
                                <Text style={styles.title}>
                                Como podemos {"\n"}
                                chamar você
                                </Text>
                            </View>
                        
                            <TextInput 
                                placeholder="Digite o nome"
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && {
                                     borderColor: colors.green
                                    
                                    },
                                    error && {
                                        borderColor: 'red'
                                    }
                                ]} 
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}  
                                onChangeText={handleInputChange} 
                            />
                            {error && <Text style={{color: 'red'}}>Por favor, informe um nome</Text>}
                            <View style={styles.footer}>
                                <Button title="Confirmar" onPress={handleNavigate}/>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'

    },
    content: {
        flex: 1,
        width: '100%',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 54,
    },
    header: {
        alignItems: 'center'
    },
    emoji: {
        fontSize: 44
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 32,
        marginTop: 20
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20
    }

})