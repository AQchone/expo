import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAuthStore } from "./src/store/authStore";
import ActivitiesScreen from "./src/screens/ActivitiesScreen";
import MonthlyStatsScreen from "./src/screens/MonthlyStatsScreen";
import useStravaAuth from "./src/services/authService";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

function LoginScreen() {
  const { promptAsync } = useStravaAuth();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => promptAsync()}
      >
        <Text style={styles.loginButtonText}>Login with Strava</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const { accessToken } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {!accessToken ? (
          <LoginScreen />
        ) : (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Activities") {
                  iconName = focused ? "bicycle" : "bicycle-outline";
                } else if (route.name === "Stats") {
                  iconName = focused ? "stats-chart" : "stats-chart-outline";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Activities" component={ActivitiesScreen} />
            <Tab.Screen name="Stats" component={MonthlyStatsScreen} />
          </Tab.Navigator>
        )}
        <StatusBar style="auto" />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "#FC4C02", // Strava orange
    padding: 15,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
