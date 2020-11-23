import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Audio } from "expo-av";

export default function App(props) {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const [Start, setStart] = useState("Press here.");
  const [Penalty, setPenalty] = useState(0);
  const [count, setCount] = useState(0);
  const [GameText, setGameText] = useState("Press The Box.");
  const [TextTime, setTextTime] = useState(0);
  const [timeStart, settimeStart] = useState(0);
  const [magic, setMagic] = useState("#E5E7E9");
  // const [index, setIndex] = useState(0);

  useEffect(() => {
    this.sound = new Audio.Sound();
    const status = {
      shouldPlay: false,
    };
    this.sound.loadAsync(require("../../assets/scream.mp3"), status, false);
  });

  function playSound() {
    console.log("play");
    this.sound.playAsync();
  }
  function stopSound() {
    console.log("stop");
    this.sound.stopAsync();
  }

  const startTheGame = async () => {
    setStart("");
    setMagic("black");
    var RandomNumber = 1000 + Math.random() * (5000 - 1000);
    setGameText("Press here When you hear the sound.");
    await delay(RandomNumber);
    playSound();
    settimeStart(performance.now());
  };

  const stopTheGame = () => {
    stopSound();
    var time = Math.abs(performance.now() - timeStart);
    setTextTime((x) => x + time);
    console.log("time : ", time);
    settimeStart(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", color: magic }}>
          Avg Time: {((TextTime + Penalty) / count).toFixed(2)} ms{"\n"}
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.GameContainer}
          onPress={() => {
            if (timeStart === 0 && count > 0 && count < 6) {
              setGameText("Are you prefiring???(Penalty +1s)");
              setPenalty((x) => x + 1000);
              return;
            }
            if (count === 0) {
              setCount((x) => x + 1);
              startTheGame();
              return;
            }
            if (count >= 1 && count <= 4) {
              setCount((x) => x + 1);
              stopTheGame();
              startTheGame();
              return;
            }
            if (count === 5) {
              setCount((x) => x + 1);
              stopTheGame();
              setGameText("");
              setStart("END");
              return;
            }
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 30,
              color: "red",
              margin: 20,
            }}
          >
            {Start}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 30,
            color: "black",
            margin: 20,
          }}
        >
          {"\n"}
          {GameText}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navbar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    width: "100%",
    height: "8%",
    position: "absolute",
    top: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: "#E5E7E9",
    marginHorizontal: 5,
    width: "90%",
  },
  bottombar: {
    flex: 1,
    bottom: 0,
    flexDirection: "row",
    position: "absolute",
    justifyContent: "flex-end",
  },
  GameContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "45%",
    borderColor: "black",
    borderWidth: 4,
  },
});
