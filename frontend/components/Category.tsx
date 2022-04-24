import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { text_styles } from './TextNormalize';

const Category = ({ category, navigation }: any) => {
    return (
        <View style={styles.listItemShadow}>
            <TouchableOpacity
                style={styles.listItem}
                onPress={() => navigation.push('SearchCategory', { category: category.title })}
            >
                <View style={styles.listItemFooter}>
                    <Text style={[text_styles.large, { fontWeight: '600' }]}>{category.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    listItem: {
        borderRadius: 16,
        backgroundColor: '#fff',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    listItemShadow: {
        borderRadius: 16,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    listItemFooter: {
        flexDirection: 'row',
        padding: 8,
        paddingLeft: 16,
    },
});

export default Category;
