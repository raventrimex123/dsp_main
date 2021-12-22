import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function Result({ navigation, route }) {
  const data = route.params;
  const date = new Date(data.date);
  return (
    <View style={{ flex: 1, margin: 20 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#9ADC6D",
          marginBottom: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 16, color: "white" }}>Successfully sent</Text>
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
          <Text style={{ fontSize: 16, color: "white" }}>
            {data.mobile_number}
          </Text>
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
              <Text style={{ fontSize: 16, color: "white" }}>{data.price}</Text>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Date:</Text>
          <Text style={{ fontSize: 16, color: "white" }}>
            {date.toLocaleDateString()}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Ref:</Text>
          <Text style={{ fontSize: 16, color: "white" }}>{data._id}</Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "#52ABFA",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.popToTop()}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
