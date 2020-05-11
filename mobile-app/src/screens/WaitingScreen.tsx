import React, {useState} from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, ImageBackground} from "react-native";

export const WaitingScreen: React.FC = () => {
  const [isHost, setHost ] = useState(true);
  const [friendsJoined, setFriendsJoined ] = useState(3);
  const [ joinCode, changeJoinCode ] = useState("ABC124");

  const backPress = () => {
    // TODO: Add change screen functionality here
  }

  const beginMatchingPress = () => {
    // TODO: Add change screen functionality here
  }

  return (
    <View style={styles.mainContainer}>
        <View style={{ flex: 1.2, justifyContent: "space-between"}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={backPress}>
                <Image style={styles.backButton} source={require("../images/ic_arrow_back_24px.png")}></Image>
            </TouchableOpacity>
            { isHost ? <Text style={styles.headerText}>Hosting Session</Text> : <Text style={styles.headerText}>Joined Session</Text> }
            <View style={{ width: 30 }}/>
          </View>

          <View>
            <Text style={styles.codeText}>{friendsJoined}</Text>
            <Text style={styles.bodyText}>friends have joined</Text>
          </View>
          <View>
            <Text style={styles.codeText}>{joinCode}</Text>
            <Text style={styles.bodyText}>Share this code with your friends</Text>
          </View>
        </View>
        

        <View style={{ flex: 1, justifyContent: "flex-end"}}>
          { isHost ? <Text style={styles.bodyText}>And once everyone has joined</Text> : <View style={{ height: 28}}/> }
          <TouchableOpacity style={isHost ? styles.beginButton : styles.waitingButton} onPress={beginMatchingPress} disabled={!isHost}>
            <Text style={isHost ? styles.beginButtonText : styles.waitingButtonText}>
              { isHost ? "Begin Matching" : "Waiting on host..." } 
              </Text>
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
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  headerText: {
    fontFamily: "SFProDisplay-Bold",
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF",
    textAlign:"center"
  },
  backButton: {
    width: 30,
    resizeMode: "contain",
    alignSelf: "center",
  },
  codeText: {
    fontFamily: "SFProDisplay-Bold",
    fontWeight: "bold",
    fontSize: 60,
    textAlign: "center",
    color: "#FFFFFF",
  },
  bodyText: {
    fontFamily: "SFProDisplay-Bold",
    fontSize: 15,
    textAlign: "center",
    color: "#FFFFFF",
  },
  beginButton: {
    marginTop: 10,
    borderRadius: 15,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch"
  },
  beginButtonText: {
    fontFamily: "SFProDisplay-Medium",
    fontSize: 20,
    color: "#006607",
  },
  waitingButton: {
    marginTop: 10,
    borderRadius: 15,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    backgroundColor: "rgba(0, 0, 0, 0)",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch"
  },
  waitingButtonText: {
    fontFamily: "SFProDisplay-Medium",
    fontSize: 20,
    color: "#FFFFFF",
  }
});
