import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';

import {Button} from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug',
    nextScreen: string;
}

const emojis = {
    hug: '🤗',
    smile: '😄'
}

export function Confirmation() {

    const navigation =  useNavigation()
    const routes = useRoute()
    const { title, subtitle, buttonTitle, icon, nextScreen } = routes.params as Params

    function handleNavigation() {
        navigation.navigate('PlantSelect')
    }

  return (
      <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    😄
                </Text>

                <Text style={styles.title}>

                </Text>

                <Text style={styles.subtitle}>
                    Vamos começar a cuidar das suas 
                    plantinhas com muito cuidado
                </Text>

                <View style={styles.footer}>
                    <Button title="Começar" onPress={handleNavigation}/>
                </View>
            </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30,
    },
    emoji: {
        fontSize: 78
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 30

    },
})