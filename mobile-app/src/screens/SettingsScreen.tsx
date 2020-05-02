import React from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import Slider from '@react-native-community/slider';

interface Cuisine {
  name: string,
  selected: boolean,
  id: number,
}

export const SettingsScreen: React.FC = () => {
  const [distance, changeDistance] = React.useState(1);
  const [priceLevel, changePrice] = React.useState(1);
  const cuisines: Cuisine[] = [
    {
      name: "Indian",
      selected: false,
      id: 1,
    },
    {
      name: "Italian",
      selected: false,
      id: 2,
    },
    {
      name: "English",
      selected: false,
      id: 3,
    },
  ];

  const [cuisineState, changeCuisineState] = React.useState<Cuisine[]>(cuisines);

  const displayPrice = () => {
    let value = "";
    for (let i = 0; i < priceLevel; i++) {
      value += "$";
    }
    return value;
  }

  const onBackPress = () => {
    // TODO: Navigate back to home screen here
  };

  const onContinuePress = () => {
    // TODO: Make call to server and go to next screen on successful response
  }

  const onCuisinePress = (cuisine: Cuisine) => {
    const newState = cuisineState.map((c) => {
      if (c.id === cuisine.id) {
        return {...c, selected: !c.selected};
      } else {
        return c;
      }
    });
    changeCuisineState(newState);
  };

  const anyCuisinesSelected = () => {
    return cuisineState.some((c) => {
      return c.selected;
    });
  }

  const enableButton = anyCuisinesSelected();

  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBackPress}>
            <Image source={require("../images/back-arrow.png")} style={styles.backArrow}/>
          </TouchableOpacity>
          <Text style={styles.headerText}>Setup Session</Text>
          <View style={{ width: 30 }}/>
        </View>
        <Image source={require("../images/logo-with-text.png")} style={styles.logo}/>
        <CuisinesGrid cuisines={cuisineState} callback={onCuisinePress}/>
        <View style={styles.sliderContainer}>
          <View style={styles.sliderTextContainer}>
            <Text style={styles.sliderHeaderText}>Distance</Text>
            <Text style={styles.sliderValueText}>{distance} km</Text>
          </View>
          <Slider 
            step={1} 
            minimumValue={1}
            maximumValue={50} 
            onValueChange={(value) => {changeDistance(value)}} 
            value={distance}
            maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
            minimumTrackTintColor="#FFFFFF"
          />
        </View>
        <View style={styles.sliderContainer}>
          <View style={styles.sliderTextContainer}>
            <Text style={styles.sliderHeaderText}>Price</Text>
            <Text style={styles.sliderValueText}>{displayPrice()}</Text>
          </View>
          <Slider 
            step={1} 
            minimumValue={1}
            maximumValue={5} 
            onValueChange={(value) => {changePrice(value)}} 
            value={priceLevel}
            maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
            minimumTrackTintColor="#FFFFFF"
          />
          <View style={styles.sliderTextContainer}>
            <Text style={[styles.sliderKeyText, { marginLeft: 4 }]}>Low</Text>
            <Text style={[styles.sliderKeyText, { marginRight: 3 }]}>High</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity 
        disabled={!enableButton}
        style={enableButton ? styles.buttonEnabled : styles.buttonDisabled} 
        onPress={onContinuePress}
      >
        <Text 
          style={enableButton ? styles.enabledButtonText :  styles.disabledButtonText}
        >
          Invite Friends
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const CuisinesGrid = ({cuisines, callback}) => {
  return (
    <View style={{ marginBottom: 30 }}>
      {cuisines.map((cuisine) => {
        return (
          <TouchableOpacity 
            key={cuisine.id} 
            style={cuisine.selected ? styles.cuisineSelected : styles.cuisineUnselected}
            onPress={() => callback(cuisine)}
          >
            <Text style={cuisine.selected ? styles.selectedCuisineText : styles.sliderKeyText}>{cuisine.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

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
  backArrow: {
    width: 30,
    resizeMode: "contain",
    alignSelf: "center",
  },
  headerText: {
    fontFamily: "SFProDisplay-Bold",
    flex: 1,
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
  },
  logo: {
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: 50,
  },
  sliderContainer: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 30,
  },
  sliderTextContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "flex-end",
    marginBottom: 10,
  },
  sliderHeaderText: {
    fontFamily: "SFProDisplay-Bold",
    color: "#FFFFFF",
    fontSize: 20,
  },
  sliderValueText: {
    fontFamily: "SFProDisplay-Regular",
    color: "#FFFFFF",
    fontSize: 18,
  },
  sliderKeyText: {
    fontFamily: "SFProDisplay-Bold",
    color: "#FFFFFF",
    fontSize: 12,
  },
  selectedCuisineText: {
    fontFamily: "SFProDisplay-Bold",
    color: "#006607",
    fontSize: 12,
  },
  cuisineUnselected: {
    display: "flex",
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "#006607",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  cuisineSelected: {
    display: "flex",
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
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
  disabledButtonText: {
    fontFamily: "SFProDisplay-Medium",
    fontSize: 20,
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
  enabledButtonText: {
    fontFamily: "SFProDisplay-Medium",
    fontSize: 20,
    color: "#006607",
  },
});

export default SettingsScreen;