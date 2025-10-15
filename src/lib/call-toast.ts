import { ToastAndroid } from "react-native";

export function CallToast(message: string) {
  ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
}