import React from "react";
import { Stack } from "expo-router";
import HomeScreen from "../(homeS)";


export default function Routes() {
    return <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <Stack.Screen name={'(homeS)'} />
    {/* <Stack.Screen name="details" /> */}
    </Stack>
}