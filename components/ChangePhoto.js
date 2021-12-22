import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfigData from "../config.json";

export default function ChangePhoto({ navigation }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const HandleUpdate = async () => {
    const isID = await AsyncStorage.getItem("_id");

    if (image === null) return Alert.alert("Message", "Please select a photo.");

    var raw = JSON.stringify({
      id: isID,
      image: image,
    });

    await fetch(`${ConfigData.DB_LINK}api/dsp/updpateuserphoto`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: raw,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.message === "OK") {
          Alert.alert("Message", "Photo updated.");
          navigation.goBack();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result["base64"]);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          height: 150,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Update Photo</Text>
        {image ? (
          <TouchableOpacity
            style={{ borderWidth: 1 }}
            onPress={() => pickImage()}
          >
            <Image
              source={{ uri: `data:image/png;base64,${image}` }}
              style={{ width: 300, height: 300 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => pickImage()}
            style={{
              backgroundColor: "#D7D7D7",
              padding: 35,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SimpleLineIcons name="user" size={55} color="#6B6B6B" />
            <Text>Click Here</Text>
          </TouchableOpacity>
        )}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            paddingLeft: 30,
            paddingRight: 30,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#52ABFA",
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => HandleUpdate()}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#FA3636",
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
