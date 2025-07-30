import { Stack } from "expo-router";
import { CartProvider } from "@/contexts/CartContext";
export default function RootLayout() {
  return (
    <CartProvider>
    <Stack >
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
    </CartProvider>
    )
  ;
}
