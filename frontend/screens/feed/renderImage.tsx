import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const RenderImage = ({ item, imageKey }: any) => {
    return <Image style={styles.postItemImage} source={{ uri: item[imageKey] }} />;
};

export default RenderImage;

const styles = StyleSheet.create({
    postItemImage: {
        minHeight: windowWidth,
        maxHeight: windowWidth,
        aspectRatio: 1,
    },
});
