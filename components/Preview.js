import React, { useState } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfigData from "../config.json";

export default function Preview({ navigation, route }) {
  const data = route.params;
  const [isLoading, setLoading] = useState(false);

  const Transaction = async () => {
    const isID = await AsyncStorage.getItem("_id");
    if (data.type === "load") {
      setLoading(true);
      var raw = JSON.stringify({
        uid: isID,
        type: data.type,
        name: data.name,
        amount: data.amount,
        mobile_number: data.number,
      });
      await fetch(`${ConfigData.DB_LINK}api/dsp/customerload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: raw,
      })
        .then((response) => response.json())
        .then(async (results) => {
          var rawed = JSON.stringify({
            id: isID,
            load_balance: -data.amount,
            load_distributed: data.amount,
            load_overall: data.amount,
          });
          await fetch(`${ConfigData.DB_LINK}api/dsp/loadsale`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: rawed,
          })
            .then((response) => response.json())
            .then((result) => navigation.push("Result", results))
            .catch((error) => setLoading(false));
        })
        .catch((error) => setLoading(false));
    } else {
      setLoading(true);
      var raw = JSON.stringify({
        uid: isID,
        type: data.type,
        name: data.name,
        amount: data.amount,
        price: data.price,
        mobile_number: data.number,
      });
      await fetch(`${ConfigData.DB_LINK}api/dsp/customerpocsim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: raw,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then(async (results) => {
          if (data.type === "pocketwifi") {
            var pocketwifi = JSON.stringify({
              id: isID,
              type: data.type,
              pocketwifi_balance: -data.amount,
              pocketwifi_distributed: data.amount,
              pocketwifi_overall: data.amount,
            });
            await fetch("https://dfa-db.herokuapp.com/api/dsp/sales", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: pocketwifi,
            })
              .then((response) => response.json())
              .then((result) => navigation.push("Result", results))
              .catch((error) => setLoading(false));
          } else if (data.type === "simcard") {
            var simcard = JSON.stringify({
              id: isID,
              type: data.type,
              simcard_balance: -data.amount,
              simcard_distributed: data.amount,
              simcard_overall: data.amount,
            });
            await fetch(`${ConfigData.DB_LINK}api/dsp/sales`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: simcard,
            })
              .then((response) => response.json())
              .then((result) => navigation.push("Result", results))
              .catch((error) => setLoading(false));
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            elevation: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={{ color: "black" }}>Loading...</Text>
        </View>
      ) : undefined}
      <View style={{ flex: 1, margin: 20 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            backgroundColor: "#52ABFA",
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>
            Load confirmation
          </Text>
        </View>
        <View
          style={{ backgroundColor: "#52ABFA", padding: 20, borderRadius: 10 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Name:</Text>
            <Text style={{ fontSize: 16, color: "white" }}>{data.name}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Number:</Text>
            <Text style={{ fontSize: 16, color: "white" }}>{data.number}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Amount:</Text>
            <Text style={{ fontSize: 16, color: "white" }}>{data.amount}</Text>
          </View>
          {data.type !== "load" ? (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16, color: "white" }}>Price:</Text>
                <Text style={{ fontSize: 16, color: "white" }}>
                  {data.price}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16, color: "white" }}>Total:</Text>
                <Text style={{ fontSize: 16, color: "white" }}>
                  {data.price * data.amount}
                </Text>
              </View>
            </>
          ) : undefined}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "#9ADC6D",
              borderRadius: 10,
            }}
            onPress={() => Transaction()}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "#FA3636",
              borderRadius: 10,
            }}
            onPress={() => navigation.pop(1)}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
