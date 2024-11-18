import { Canvas, DiffRect, rect, rrect } from "@shopify/react-native-skia";
import { Dimensions, Platform, Text, StyleSheet } from "react-native";
import { QRfound } from "@/app/QRclass";

const { width, height } = Dimensions.get("window");

const innerDimension = 300;

const outer = rrect(rect(0, 0, width, height), 0, 0);
const inner = rrect(
  rect(
    width / 2 - innerDimension / 2,
    height / 2 - innerDimension / 2,
    innerDimension, innerDimension
  ),
  50, 50
);

export const Overlay = () => {
  return (
    <><Canvas style={Platform.OS === "android" ? { flex: 0.96 } : StyleSheet.absoluteFillObject}>
      <DiffRect inner={inner} outer={outer} color="black" opacity={0.5} />
    </Canvas><Text style={{backgroundColor: 'grey', color: 'white', fontSize: 15}}>QR funnen: "{QRfound.QRtext}". (OBS! Nästa skannad QR-kod visas inte direkt. Återgå till huvudmenyn för att uppdatera resultat.)</Text></>
  );
};