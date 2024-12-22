import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                // 탭바 아이콘 색
                tabBarActiveTintColor: "#ffd33d",
                // 헤더 바탕 색
                headerStyle: {
                    backgroundColor: "#25292e",
                },
                // 헤더 쉐도우
                headerShadowVisible: false,
                // 헤더 글자 색
                headerTintColor: "#fff",
                // 탭바 색
                tabBarStyle: {
                    backgroundColor: "#25292e",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "home-sharp" : "home-outline"} color={color} size={24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    title: "About",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "information-circle" : "information-circle-outline"}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
