import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    Image, 
    View
} from 'react-native'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import AsyncStorage from '@react-native-async-storage/async-storage'


import UserImg from '../assets/avatar.png'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Header() {

    const [name, setName] = useState<string>()

    async function setUserName() {
        const user = await AsyncStorage.getItem('@plantmanager:user')

        setName(user || '')
    }

    useEffect(() => {
        setUserName()
    }, [name])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>
                    Olá,
                </Text>
                <Text style={styles.userName}>
                    { name }
                </Text>
            </View>

            <Image source={UserImg} style={styles.image}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    greeting: {
        fontSize: 32,
        color: colors.gray,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40
    }
})