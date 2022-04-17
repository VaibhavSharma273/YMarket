import React from 'react';
import {
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default (RenderImage = ({
    item,
    imageKey
}) => {
    return (
        <Image style={styles.postItemImage} source={{ uri: item[imageKey] }} />
    );
});

const styles = StyleSheet.create(
    {
        postItemImage: {
            minHeight: windowWidth,
            maxHeight: windowWidth,
            aspectRatio: 1,
        },
    }
)