import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { useNavigation } from "@navigation/hooks/useNavigation";
import {getFriendsJoinedCount, getInteractionStatus, startInteraction} from "../api/api";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export type WaitingScreenNavigationParams = {
  readonly isHost: boolean;
  readonly code: string;
};

export const WaitingScreen: React.FC = () => {
  const navigation = useNavigation();
  // @ts-ignore
  const [isHost, setHost ] = useState(navigation.getParam('isHost'));
  const [friendsJoined, setFriendsJoined ] = useState(0);
  // @ts-ignore
  const [ joinCode, changeJoinCode ] = useState(navigation.getParam("code"));

  const intervalID = setInterval(async () => {
    const count = await getFriendsJoinedCount(joinCode);
    await setFriendsJoined(parseInt(count) -1);
  }, 500)

  useEffect(() => {
    let intID = setInterval(async () => {
      if (!isHost) {
        if (await getInteractionStatus(joinCode) === true) {
          await beginMatchingPress();
        }
      }
    }, 500);
    return() => {
      clearInterval(intID);
    }
  });

  const beginMatchingPress = async () => {
    clearInterval(intervalID)
    if(isHost) {
      await startInteraction(joinCode);
    }
    navigation.navigate("ReadyScreen", {code: joinCode});
  }
  return (
    <View style={styles.mainContainer}>
        <View style={{ flex: 1.2, justifyContent: "space-between"}}>
          <View style={styles.header}>
            { isHost ? <Text style={styles.headerText}>Hosting Session</Text> : <Text style={styles.headerText}>Joined Session</Text> }
          </View>

          <View>
            <Text style={styles.codeText}>{friendsJoined}</Text>
            <Text style={styles.bodyText}>{"friend" + (friendsJoined === 1 ? " has" : "s have") + " joined"}</Text>
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
    padding: wp('10%'),
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp('3%'),
  },
  headerText: {
    fontFamily: "SFProDisplay-Bold",
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF",
    textAlign:"center"
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
    marginTop: hp('3%'),
    borderRadius: 15,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
    height: hp('8%'),
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
    marginTop: hp('3%'),
    borderRadius: 15,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    backgroundColor: "rgba(0, 0, 0, 0)",
    height: hp('8%'),
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
