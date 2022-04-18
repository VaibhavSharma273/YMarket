import React, { useState, useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';

/* eslint-disable */
export default function ProfilePhoto({ src }: { src: string }): JSX.Element {
    const defaultAvatar = require('../assets/images/blank-profile-picture.png');
    const [image, setImage] = useState(src ? { uri: src } : defaultAvatar);

    useEffect(() => {
        if (src != image.uri) {
            setImage(src ? { uri: src } : defaultAvatar);
        }
    }, [src]);

    return (
        <Image
            source={image}
            style={styles.image}
            onError={({ nativeEvent: { error } }) => {
                setImage(defaultAvatar);
            }}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 400 / 2,
    },
});
