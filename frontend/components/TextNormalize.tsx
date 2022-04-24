import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 350;

export function normalize(size: number) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
}

export const text_styles = {
    mini: {
        fontSize: normalize(12),
    },
    small: {
        fontSize: normalize(15),
    },
    medium: {
        fontSize: normalize(17),
    },
    large: {
        fontSize: normalize(20),
    },
    xlarge: {
        fontSize: normalize(24),
    },
};
