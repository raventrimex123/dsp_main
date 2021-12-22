import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function ViewTransaction({ navigation, route }) {
  const Data = route.params;
  const date = new Date(Data.item.date);
  return (
    <View style={{ margin: 20 }}>
      <View
        style={{ backgroundColor: "#52ABFA", padding: 20, borderRadius: 10 }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "white", fontSize: 16 }}>Send to:</Text>
          <Text style={{ color: "white", fontSize: 16 }}>{Data.item.name}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "white", fontSize: 16 }}>Mobile No.:</Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            {Data.item.mobile_number}
          </Text>
        </View>
        {Data.item.type !== "load" ? (
          <>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Amount:</Text>
              <Text style={{ color: "white", fontSize: 16 }}>
                {Data.item.amount}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Price:</Text>
              <Text style={{ color: "white", fontSize: 16 }}>
                {Data.item.price}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Total:</Text>
              <Text style={{ color: "white", fontSize: 16 }}>
                {Data.item.price * Data.item.amount}
              </Text>
            </View>
          </>
        ) : (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Amount:</Text>
            <Text style={{ color: "white", fontSize: 16 }}>
              {Data.item.amount}
            </Text>
          </View>
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "white", fontSize: 16 }}>Date:</Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            {date.toLocaleDateString()}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "white", fontSize: 16 }}>Ref:</Text>
          <Text style={{ color: "white", fontSize: 16 }}>{Data.item._id}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "tomato",
          margin: 20,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}
