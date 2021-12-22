import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfigData from "../config.json";

export default function Amount({ navigation, route }) {
  const data = route.params;
  const [isAmount, setAmount] = useState(null);
  const [isPrice, setPrice] = useState(null);
  const [isBalance, setBalance] = useState([]);
  const [isLoad, setLoad] = useState(0);
  const [isSimCard, setSimCardr] = useState(0);
  const [isPocketWifi, setPocketWifi] = useState(0);

  const isData = { ...data, ...{ amount: isAmount, price: isPrice } };

  useEffect(() => {
    (async () => {
      const isID = await AsyncStorage.getItem("_id");
      await fetch(`${ConfigData.DB_LINK}api/dsp/sale/${isID}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((result) => {
          setLoad(result[0].load_balance);
          setSimCardr(result[0].simcard_balance);
          setPocketWifi(result[0].pocketwifi_balance);
          setBalance(result);
        })
        .catch((error) => console.log("error", error));
    })();
  }, []);

  const HandleSubmit = async () => {
    if (!isAmount)
      return Alert.alert("Message", "Don't leave the field blank.");

    if (data.type == "load")
      if (isAmount > isBalance[0].load_balance)
        return setAmount(null), Alert.alert("Message", "Insufficient balance.");

    if (data.type == "simcard")
      if (isAmount > isBalance[0].simcard_balance)
        return setAmount(null), Alert.alert("Message", "Insufficient balance.");

    if (data.type == "pocketwifi")
      if (isAmount > isBalance[0].pocketwifi_balance)
        return setAmount(null), Alert.alert("Message", "Insufficient balance.");

    if (data.type !== "load")
      if (!isPrice)
        return Alert.alert("Message", "Don't leave the field blank.");

    navigation.push("Preview", isData);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View
        style={{ margin: 10, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontSize: 24 }}>
          {data.type === "load"
            ? "Load"
            : data.type === "simcard"
            ? "Sim Card"
            : data.type === "pocketwifi"
            ? "Pocket Wifi"
            : undefined}
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: 16, marginRight: 10 }}>
          {data.type === "load" ? "Amount" : "Piece(s)"}
        </Text>
        <View style={{ alignItems: "flex-end" }}>
          <Text>{`Balance: ${
            data.type === "load"
              ? isLoad
              : data.type === "simcard"
              ? isSimCard
              : data.type === "pocketwifi"
              ? isPocketWifi
              : undefined
          }`}</Text>
        </View>
        <TextInput
          value={isAmount}
          onChangeText={(data) => setAmount(data)}
          keyboardType="numeric"
          placeholder={data.type === "load" ? "Load Amount" : "Quantity"}
          style={{ borderBottomWidth: 1, marginRight: 10, fontSize: 16 }}
        />
        {data.type === "load" ? undefined : (
          <>
            <Text style={{ fontSize: 16, marginRight: 10 }}>Price</Text>
            <TextInput
              value={isPrice}
              onChangeText={(data) => setPrice(data)}
              placeholder="Amount"
              keyboardType="numeric"
              style={{ borderBottomWidth: 1, marginRight: 10, fontSize: 16 }}
            />
          </>
        )}
      </View>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#9ADC6D",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
        onPress={() => HandleSubmit()}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#FA3636",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.popToTop()}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
