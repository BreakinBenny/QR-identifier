import { SafeAreaView, StyleSheet, Text, View, Pressable, ScaleXTransform } from "react-native";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, Stack } from 'expo-router';
import React from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { transform } from "@babel/core";


export default function Index() {

  const [permission, requestPermission] = useCameraPermissions();
  const HavePerms = Boolean(permission?.granted);

  return (
    <SafeAreaView style={styles.backgrnd}>
      <Stack.Screen options={{ title: "Huvudmeny", headerShown: false }} />
      <Text style={styles.title}>Välkommen till Wernickes app för QR-skanning!</Text>
      <View style={{ gap: 10 }}>
      <Text style={[ {opacity: !HavePerms ? 0 : 1 } ]}>
        OBS! För att återkalla tillgång till kameran{'\n'}måste du göra det från Inställningar i din enhet.
      </Text>
        <Pressable onPress={requestPermission}>
          <Text style={styles.buttonStyle}>Ge tillgång</Text>
        </Pressable>
        <Link href={"/scanner"} asChild>
          <Pressable disabled={!HavePerms}>
            <Text style={[styles.buttonStyle, {opacity: !HavePerms ? 0.5 : 1 }, ]}>Skanna kod</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgrnd: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    justifyContent: 'space-around',
    paddingVertical: 2,
  },
  title: {
    color: 'black',
    fontSize: 40,
  },
  buttonStyle: {
    color: 'orange',
    fontSize: 30,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  }
});
