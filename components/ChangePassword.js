import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfigData from "../config.json";

export default function ChangePassword({ navigation }) {
  const [isNewPassword, setNewPassword] = useState(null);
  const [isConfirmPassword, setConfirmPassword] = useState(null);

  const HandleUpdate = async () => {
    const isID = await AsyncStorage.getItem("_id");

    if (isNewPassword === null)
      return Alert.alert("Message", "Please don't leave the field blank");

    if (isConfirmPassword === null)
      return Alert.alert("Message", "Please don't leave the field blank");

    if (isNewPassword !== isConfirmPassword)
      return Alert.alert("Message", "Password doesn't matched");

    var raw = JSON.stringify({
      id: isID,
      password: isNewPassword,
    });

    await fetch(`${ConfigData.DB_LINK}api/dsp/updateuserpassword`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: raw,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "OK") {
          Alert.alert("Message", "Password updated.");
          navigation.goBack();
        }
      })
      .catch((error) => console.log("error", error));
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
          alignItems: "center",
          width: "100%",
          height: 250,
          padding: 10,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Change Password</Text>
        <TextInput
          onChangeText={(data) => setNewPassword(data)}
          secureTextEntry={true}
          value={isNewPassword}
          placeholder="New Password"
          style={{
            borderBottomWidth: 1,
            width: "100%",
            fontSize: 16,
            marginBottom: 10,
          }}
        />
        <TextInput
          onChangeText={(data) => setConfirmPassword(data)}
          secureTextEntry={true}
          value={isConfirmPassword}
          placeholder="Confirm Password"
          style={{
            borderBottomWidth: 1,
            width: "100%",
            fontSize: 16,
            marginBottom: 10,
          }}
        />
        <TouchableOpacity
          onPress={() => HandleUpdate()}
          style={{
            backgroundColor: "#9ADC6D",
            paddingTop: 10,
            paddingBottom: 10,
            width: "100%",
            alignItems: "center",
            borderRadius: 10,
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#FA3636",
            paddingTop: 10,
            paddingBottom: 10,
            width: "100%",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
