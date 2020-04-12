import React from "react";
import { StyleSheet, Text, Image, View, TextInput, TouchableOpacity } from "react-native";

export const HomeScreen: React.FC = () => {
  const [code, changeCode] = React.useState("");
  const [invalidCode, changeCodeInvalid] = React.useState(false);

  const joinButtonPress = () => {
    // TODO: Change this functionality later to validate session code
    if (code !== "") {
      changeCodeInvalid(true);
    }
  }

  const newSessionPress = () => {
    // TODO: Add change screen functionality here
  }

  return (
    <View style={styles.mainContainer}>
      <View>
        <Image source={require("../images/salad-plates.png")} style={styles.saladPlates}/>
        <Text style={styles.tagline}>Match with the restaurant of your dreams!</Text>
      </View>
      <View style={{flex: 1, justifyContent: "space-between"}}>
        <View style={{marginTop: 30}}>
          <View style={invalidCode ? [styles.codeInput, styles.invalidCodeBorder]: styles.codeInput}>
            <Image source={require("../images/fork-knife.png")} style={styles.forkKnife}/>
            <TextInput 
              style={styles.textInput} value={code} 
              placeholder={"Session Invite Code"} 
              onChangeText={text => changeCode(text.trim())}
              placeholderTextColor={"#979797"}
            />
          </View>
          <TouchableOpacity 
            style={code === "" ? styles.buttonDisabled : styles.buttonEnabled} 
            onPress={joinButtonPress}
            disabled={code === ""}
          >
            <Text style={code === "" ? styles.disabledText : styles.enabledText}>Join</Text>
          </TouchableOpacity>
          { invalidCode && code ? <Text style={styles.invalidCodeText}>Invalid code! Please try again.</Text> : null }
        </View>
        <TouchableOpacity style={styles.buttonEnabled} onPress={newSessionPress}>
          <Text style={styles.enabledText}>Host a New Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
    backgroundColor: "#006607",
    padding: 40,
  },
  tagline: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 20,
  },
  saladPlates: {
    width: 500,
    resizeMode: "contain",
    marginTop: 60,
    alignSelf: "center"
  },
  codeInput: {
    borderRadius: 15,
    borderColor: "#979797",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 15,
  },
  forkKnife: {
    marginHorizontal: 20,
    height: 20,
    width: 18,
    resizeMode: "contain"
  },
  textInput: {
    flex: 1,
    color: "#979797",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
    marginRight: 58,
  },
  buttonDisabled: {
    borderRadius: 15,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    backgroundColor: "rgba(0, 0, 0, 0)",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  buttonEnabled: {
    borderRadius: 15,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  enabledText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#006607",
  },
  invalidCodeText: {
    textAlign: "center",
    fontSize: 15,
    color: "#FF8900",
    marginTop: 10
  },
  invalidCodeBorder: {
    borderColor: "#FF8900",
    borderWidth: 2,
  }
});
