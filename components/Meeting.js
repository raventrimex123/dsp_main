import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ConfigData from "../config.json";

export default function Meeting() {
  const [isData, setData] = useState([]);

  useEffect(() => {
    (async () => {
      await fetch(`${ConfigData.DB_LINK}api/dsp/meeting`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((result) => setData(result))
        .catch((error) => console.log("error", error));
    })();
  }, []);

  return (
    <>
      {isData ? (
        <View
          style={{
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          {isData.map((data, index) => {
            const date = new Date(data.data_time);
            return (
              <View
                key={index}
                style={{
                  borderRadius: 10,
                  backgroundColor: "#FA7365",
                  marginBottom: 10,
                  padding: 20,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    textAlign: "justify",
                  }}
                >
                  {data.content}
                </Text>
                <Text
                  style={{ textAlign: "right", color: "white", fontSize: 12 }}
                >
                  {`Date: ${date.toLocaleDateString()} Time: ${date.toLocaleTimeString()}`}
                </Text>
              </View>
            );
          })}
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18 }}>No meeting(s) today.</Text>
        </View>
      )}
    </>
  );
}
