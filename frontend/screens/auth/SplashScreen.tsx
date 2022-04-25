import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View } from '../../components/Themed';

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/ymarket_logo.png')} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 85,
        height: 75,
        marginBottom: 10,
    },
});
