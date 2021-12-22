import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Meeting from "./components/Meeting";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "./assets/178090737_482452996134415_8681946246992772024_n.jpg";
import Inventory from "./components/Inventory";
import Transaction from "./components/Transaction";
import ViewTransaction from "./components/ViewTransaction";
import ChangePassword from "./components/ChangePassword";
import ChangePhoto from "./components/ChangePhoto";
import Payment from "./components/Payment";
import ScanQR from "./components/ScanQR";
import Amount from "./components/Amount";
import Preview from "./components/Preview";
import Result from "./components/Result";
import ConfigData from "./config.json";

export default function App() {
  const [isLogin, setLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const isID = await AsyncStorage.getItem("_id");
      if (isID) return setLogin(true), setLoading(false);
      setLoading(false);
    })();
  }, []);

  const Drawer = createDrawerNavigator();

  function HomeScreen() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Image
          style={{ width: 300, height: 115 }}
          source={Logo}
          resizeMode={"cover"}
        />
        <Text style={{ fontSize: 35, marginBottom: 10 }}>Home</Text>
      </View>
    );
  }

  const SettingsStock = createNativeStackNavigator();
  const MeetingStock = createNativeStackNavigator();
  const InventoryStock = createNativeStackNavigator();
  const TransactionStock = createNativeStackNavigator();
  const PaymentStock = createNativeStackNavigator();

  const PaymentScreen = () => {
    return (
      <PaymentStock.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <PaymentStock.Screen name="PaymentScreen" component={Payment} />
        <PaymentStock.Screen name="ScanQR" component={ScanQR} />
        <PaymentStock.Screen name="Amount" component={Amount} />
        <PaymentStock.Screen name="Preview" component={Preview} />
        <PaymentStock.Screen name="Result" component={Result} />
      </PaymentStock.Navigator>
    );
  };

  const TransactionScreen = () => {
    return (
      <TransactionStock.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <TransactionStock.Screen
          name="TransactionScreen"
          component={Transaction}
        />
        <TransactionStock.Screen
          name="ViewTransaction"
          component={ViewTransaction}
        />
      </TransactionStock.Navigator>
    );
  };

  const InventoryScreen = () => {
    return (
      <InventoryStock.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <InventoryStock.Screen name="inventoryScreen" component={Inventory} />
      </InventoryStock.Navigator>
    );
  };

  const MeetingScreen = () => {
    return (
      <MeetingStock.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <MeetingStock.Screen name="MeetingC1" component={Meeting} />
      </MeetingStock.Navigator>
    );
  };

  function Settings({ navigation }) {
    const HandleLogout = async () => {
      const isID = await AsyncStorage.getItem("_id");

      var raw = JSON.stringify({
        _id: isID,
      });

      await fetch(`${ConfigData.DB_LINK}api/dsp/logout`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: raw,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then(async (result) => await AsyncStorage.clear(), setLogin(false))
        .catch((error) => console.log("error", error));
    };
    return (
      <View
        style={{
          flex: 1,
          padding: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#52ABFA",
            padding: 15,
            marginBottom: 10,
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Change password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#52ABFA",
            padding: 15,
            marginBottom: 10,
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate("ChangePhoto")}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Change photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "#FA3636", padding: 15, borderRadius: 5 }}
          onPress={async () => HandleLogout()}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const SettingsScreen = () => {
    return (
      <SettingsStock.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <SettingsStock.Screen name="SettingC1" component={Settings} />
        <SettingsStock.Screen
          name="ChangePassword"
          component={ChangePassword}
        />
        <SettingsStock.Screen name="ChangePhoto" component={ChangePhoto} />
      </SettingsStock.Navigator>
    );
  };

  const CustomDrawer = (props) => {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
              backgroundColor: "#1F1D36",
              marginBottom: 5,
            }}
          >
            <View>
              <Text style={{ fontSize: 16, color: "white" }}>Dessert Fox</Text>
              <Text style={{ color: "white" }}>Capstone</Text>
            </View>
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    );
  };

  function MyDrawer() {
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Payment" component={PaymentScreen} />
        <Drawer.Screen name="Inventory" component={InventoryScreen} />
        <Drawer.Screen name="Transaction" component={TransactionScreen} />
        <Drawer.Screen name="Meeting" component={MeetingScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    );
  }

  const AuthScreenStock = createNativeStackNavigator();

  function Register({ navigation }) {
    const [isName, setName] = useState(null);
    const [isNumber, setNumber] = useState(null);
    const [isAddress, setAddress] = useState(null);
    const [isPassword, setPassword] = useState(null);
    const [isConfirmPassword, setConfirmPassword] = useState(null);
    const [isAreaLocation, setAreaLocation] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const HandleRegister = () => {
      if (!isName) return Alert.alert("Message", "Don't leave the field empty");
      if (!isNumber)
        return Alert.alert("Message", "Don't leave the field empty");
      if (!isAddress)
        return Alert.alert("Message", "Don't leave the field empty");
      if (!isAreaLocation)
        return Alert.alert("Message", "Don't leave the field empty");
      if (!isPassword)
        return Alert.alert("Message", "Don't leave the field empty");
      if (!isConfirmPassword)
        return Alert.alert("Message", "Don't leave the field empty");
      if (isPassword !== isConfirmPassword) {
        return Alert.alert("Message", "Password not matched.");
      }

      const raw = JSON.stringify({
        name: isName,
        mobile_number: isNumber,
        address: isAddress,
        area_located: isAreaLocation,
        password: isPassword,
      });

      setTimeout(async () => {
        setLoading(true);
        await fetch(`${ConfigData.DB_LINK}api/dsp/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: raw,
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.message !== "OK")
              return Alert.alert("message", result.message);
            return Alert.alert("message", "Successfully Registered");
          })
          .catch((error) => console.log("error", error));
        setLoading(false);
      }, 0);

      setName(null);
      setNumber(null);
      setAddress(null);
      setPassword(null);
      setAreaLocation(null);
      setConfirmPassword(null);
    };

    return (
      <View
        style={{
          flex: 1,
          marginTop: 85,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Image
            style={{ width: 300, height: 115 }}
            source={Logo}
            resizeMode={"cover"}
          />
          <Text style={{ fontSize: 35, marginBottom: 10 }}>Sign Up</Text>
        </View>
        <View>
          <View>
            <View
              style={{
                marginLeft: 50,
                marginRight: 50,
                marginBottom: 10,
                borderBottomWidth: 2,
              }}
            >
              <TextInput
                value={isName}
                onChangeText={(data) => setName(data)}
                placeholder="Fullname"
                style={{
                  fontSize: 16,
                }}
              />
            </View>
            <View
              style={{
                marginLeft: 50,
                marginRight: 50,
                marginBottom: 10,
                borderBottomWidth: 2,
              }}
            >
              <TextInput
                value={isNumber}
                onChangeText={(data) => setNumber(data)}
                placeholder="Mobile Number"
                style={{
                  fontSize: 16,
                }}
                keyboardType="numeric"
              />
            </View>
            <View
              style={{
                marginLeft: 50,
                marginRight: 50,
                marginBottom: 10,
                borderBottomWidth: 2,
              }}
            >
              <TextInput
                value={isAddress}
                onChangeText={(data) => setAddress(data)}
                placeholder="Address"
                style={{
                  fontSize: 16,
                  width: "100%",
                }}
              />
            </View>
            <View
              style={{
                marginLeft: 50,
                marginRight: 50,
                marginBottom: 10,
                borderBottomWidth: 2,
              }}
            >
              <TextInput
                value={isAreaLocation}
                onChangeText={(data) => setAreaLocation(data)}
                placeholder="Area Located"
                style={{
                  fontSize: 16,
                  width: "100%",
                }}
              />
            </View>
            <View
              style={{
                marginLeft: 50,
                marginRight: 50,
                marginBottom: 10,
                borderBottomWidth: 2,
              }}
            >
              <TextInput
                value={isPassword}
                onChangeText={(data) => setPassword(data)}
                placeholder="Password"
                secureTextEntry={true}
                style={{
                  fontSize: 16,
                  width: "100%",
                }}
              />
            </View>
            <View
              style={{
                marginLeft: 50,
                marginRight: 50,
                marginBottom: 10,
                borderBottomWidth: 2,
              }}
            >
              <TextInput
                value={isConfirmPassword}
                onChangeText={(data) => setConfirmPassword(data)}
                placeholder="Confirm Password"
                secureTextEntry={true}
                style={{
                  fontSize: 16,
                  width: "100%",
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            disabled={isLoading}
            style={{
              width: 262,
              height: 40,
              backgroundColor: "#9ADC6D",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              marginBottom: 10,
            }}
            onPress={() => {
              HandleRegister();
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {isLoading ? (
                <ActivityIndicator size={25} color="#52ABFA" />
              ) : (
                "Sign Up"
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isLoading}
            style={{
              width: 262,
              height: 40,
              backgroundColor: "#9ADC6D",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {isLoading ? (
                <ActivityIndicator size={25} color="#52ABFA" />
              ) : (
                "Login"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function Login({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [isNumber, setNumber] = useState(null);
    const [isPassword, setPassword] = useState(null);

    const cleatInput = () => {
      setNumber(null);
      setPassword(null);
    };

    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem("_id", value);
        setLoading(false);
        setLogin(true);
      } catch (e) {
        console.log(e);
      }
    };
    const HandleLogin = () => {
      if (!isNumber)
        return Alert.alert("Message", "Don't leave the field empty");
      if (!isPassword)
        return Alert.alert("Message", "Don't leave the field empty");

      setLoading(true);
      var raw = JSON.stringify({
        mobile_number: isNumber,
        password: isPassword,
      });

      fetch(`${ConfigData.DB_LINK}api/dsp/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: raw,
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message !== "OK")
            return (
              Alert.alert("message", result.message),
              cleatInput(),
              setLoading(false)
            );
          return storeData(result._id);
        })
        .catch((error) => console.log("error", error));
    };

    return (
      <View style={{ flex: 1, marginTop: 85 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Image
            style={{ width: 300, height: 115 }}
            source={Logo}
            resizeMode={"cover"}
          />
          <Text style={{ fontSize: 35, marginBottom: 10 }}>Login</Text>
        </View>
        <View
          style={{
            marginLeft: 50,
            marginRight: 50,
            marginBottom: 10,
            borderBottomWidth: 2,
            borderBottomColor: "#A9A9A8",
          }}
        >
          <Text style={{ fontSize: 16 }}>Mobile Number</Text>
          <TextInput
            value={isNumber}
            onChangeText={(data) => setNumber(data)}
            placeholder="Ex: 0916224xxxx"
            style={{ fontSize: 16 }}
            keyboardType="numeric"
          />
        </View>
        <View
          style={{
            marginLeft: 50,
            marginRight: 50,
            marginBottom: 10,
            borderBottomWidth: 2,
            borderBottomColor: "#A9A9A8",
          }}
        >
          <Text style={{ fontSize: 16 }}>Password</Text>
          <TextInput
            value={isPassword}
            onChangeText={(data) => setPassword(data)}
            placeholder="Ex: 123456"
            secureTextEntry={true}
            style={{ fontSize: 16 }}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: 262,
              height: 40,
              backgroundColor: "#9ADC6D",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              marginBottom: 10,
            }}
            onPress={() => HandleLogin()}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {isLoading ? (
                <ActivityIndicator size={25} color="#52ABFA" />
              ) : (
                "Login"
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 262,
              height: 40,
              backgroundColor: "#9ADC6D",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {isLoading ? (
                <ActivityIndicator size={25} color="#52ABFA" />
              ) : (
                "Sign Up"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function AuthScreen() {
    return (
      <AuthScreenStock.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthScreenStock.Screen name="Login" component={Login} />
        <AuthScreenStock.Screen name="Signup" component={Register} />
      </AuthScreenStock.Navigator>
    );
  }

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
      ) : (
        <NavigationContainer initialRouteName="Home">
          {isLogin ? <MyDrawer /> : <AuthScreen />}
        </NavigationContainer>
      )}
    </>
  );
}
