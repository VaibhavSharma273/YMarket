import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Category from './Category'

const CATEGORIES = [
    {
        id: '1',
        title: 'general'
    },
    {
        id: '2',
        title: 'clothing'
    },
    {
        id: '3',
        title: 'furniture'
    },
    {
        id: '4',
        title: 'books/textbooks'
    },
    {
        id: '5',
        title: 'electronics'
    },
    {
        id: '6',
        title: 'other'
    },
]

const Item = ({ title }: any) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

const CategoryList = ({ navigation }: any) => {
    const renderItems = ({ item }: any) => {
        return <Category category={item} navigation={navigation}/>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={CATEGORIES}
                scrollEnabled={false}
                renderItem={renderItems}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    list: {
        margin: 10,
        height: "90%",
        width: "100%",
    },
    item: {
        borderRadius: 16,
        backgroundColor: "#fff",
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    title: {
      width: "100%",
      marginTop: 20,
      fontSize: 25,
      fontWeight: "bold",
      marginLeft: "10%",
    },
  });  

export default CategoryList;