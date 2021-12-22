import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function Payment({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#52ABFA",
          borderRadius: 10,
          marginBottom: 10,
        }}
        onPress={() => navigation.push("ScanQR", { type: "load" })}
      >
        <Text style={{ fontSize: 16, color: "white" }}>Load</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#52ABFA",
          borderRadius: 10,
          marginBottom: 10,
        }}
        onPress={() => navigation.push("ScanQR", { type: "simcard" })}
      >
        <Text style={{ fontSize: 16, color: "white" }}>Sim Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: "#52ABFA", borderRadius: 10 }}
        onPress={() => navigation.push("ScanQR", { type: "pocketwifi" })}
      >
        <Text style={{ fontSize: 16, color: "white" }}>Pocket Wifi</Text>
      </TouchableOpacity>
    </View>
  );
}
