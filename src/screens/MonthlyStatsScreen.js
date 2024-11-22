import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useMonthlyStats } from "./stravaApiService";

const MonthlyStatsScreen = ({ navigation }) => {
  const { data: monthlyStats, isLoading, error } = useMonthlyStats();

  const navigateToMonthActivities = (month) => {
    navigation.navigate("MonthActivities", { month });
  };

  if (isLoading) return <Text>Loading monthly stats...</Text>;
  if (error) return <Text>Error fetching monthly stats</Text>;

  return (
    <View>
      {monthlyStats.map((monthData) => (
        <TouchableOpacity
          key={monthData.month}
          onPress={() => navigateToMonthActivities(monthData.month)}
        >
          <View style={styles.monthCard}>
            <Text>{monthData.month}</Text>
            <Text>Total Distance: {monthData.totalDistance} km</Text>
            <Text>Total Time: {monthData.totalTime} hours</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  monthCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default MonthlyStatsScreen;
