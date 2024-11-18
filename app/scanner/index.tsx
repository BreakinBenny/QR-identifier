import { CameraView } from "expo-camera";
import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { AppState, Platform, SafeAreaView, Linking,
  StatusBar, FlatList, StyleSheet, Text, View } from "react-native";
import { Overlay } from "./overlay";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QRfound } from '@/app/QRclass';

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if(
        appState.current.match(/inactive|background/) && nextAppState === "active") {
          qrLock.current = false;
        }
        appState.current = nextAppState;
      });
      
      return() => {
        subscription.remove();
      };
    }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Skannare",
          headerShown: false,
        }}
      />
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          onBarcodeScanned={({ data }) => {
//            setTimeout(async () => {
//            await Linking.openURL(data);
              QRfound.QRtext = data;
//            }, 750);
            console.log("Data hittad! QR-kodens information är:", data);
          }}
        />
        <Overlay />
    </SafeAreaView>
  );
}