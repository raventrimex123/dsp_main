import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfigData from "../config.json";

export default function Inventory() {
  const [isData, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const AbortCont = new AbortController();
      const isID = await AsyncStorage.getItem("_id");

      await fetch(`${ConfigData.DB_LINK}api/dsp/sale/${isID}`, {
        signal: AbortCont.signal,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((result) => setData(result))
        .catch((error) => console.log("error", error));

      return () => AbortCont.abort();
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 10,
          marginRight: 10,
          marginLeft: 10,
          padding: 10,
          backgroundColor: "#52ABFA",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          Current Balance
        </Text>
      </View>
      {isData.map((item) => {
        return (
          <View key={item._id}>
            <View
              style={{
                backgroundColor: "#52ABFA",
                marginTop: 10,
                marginRight: 20,
                marginLeft: 20,
                padding: 20,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Load Balance
                </Text>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item.load_balance}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Load Distributed
                </Text>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item.load_distributed}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Overall Load
                </Text>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item.load_overall}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#52ABFA",
                marginTop: 10,
                marginRight: 20,
                marginLeft: 20,
                padding: 20,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Sim Card Balance
                </Text>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item.simcard_balance}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Sim Card Distributed
                </Text>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item.simcard_distributed}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Overall Sim Card
                </Text>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item.simcard_overall}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#52ABFA",
                marginTop: 10,
                marginRight: 20,
                marginLeft: 20,
                padding: 20,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Pocket Wifi Balance
                </Text>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item.pocketwifi_balance}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Pocket Wifi Distributed
                </Text>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item.pocketwifi_distributed}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Overall Pocket Wifi
                </Text>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item.pocketwifi_overall}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
