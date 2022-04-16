import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, SafeAreaView } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}: any) => {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View
            style={
              clicked
                ? styles.searchBar__clicked
                : styles.searchBar__unclicked
            }
          >
            {/* search Icon */}
            <Feather
              name="search"
              size={20}
              color="black"
              style={{ marginLeft: 1 }}
            />
            {/* Input field */}
            <TextInput
              style={styles.input}
              placeholder="Search YMarket"
              placeholderTextColor="#adadad"
              value={searchPhrase}
              onChangeText={setSearchPhrase}
              onFocus={() => {
                setClicked(true);
              }}
            />
            {/* cross Icon, depending on whether the search bar is clicked or not */}
            {clicked && (
              <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
                  setSearchPhrase("")
              }}/>
            )}
          </View>
          {/* cancel button, depending on whether the search bar is clicked or not */}
          {clicked && (
            <View>
              <Button
                title="Cancel"
                onPress={() => {
                  Keyboard.dismiss();
                  setClicked(false);
                }}
              ></Button>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  };
  export default SearchBar;
  
  // styles
  const styles = StyleSheet.create({
    container: {
      margin: 0,
      paddingLeft: 10,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      width: "90%",
    },
    searchBar__unclicked: {
      padding: 10,
      flexDirection: "row",
      width: "95%",
      backgroundColor: "#ededed",
      borderRadius: 15,
      alignItems: "center",
    },
    searchBar__clicked: {
      padding: 10,
      flexDirection: "row",
      width: "90%",
      backgroundColor: "#ededed",
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    input: {
      fontSize: 20,
      marginLeft: 10,
      width: "83%",
    },
  });
  