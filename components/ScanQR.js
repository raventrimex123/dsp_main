import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function ScanQR({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [isScan, setScan] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScan(true);
    try {
      if (JSON.parse(data))
        return navigation.push("Amount", {
          ...JSON.parse(data),
          ...route.params,
        });
    } catch (error) {
      if (error)
        return Alert.alert("Message", "Invalid QRCode"), navigation.pop();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={BarCodeScanner.Constants.BarCodeType}
        onBarCodeScanned={isScan ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
      />
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#FA3636",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.pop()}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
