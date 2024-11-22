import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useStravaActivities } from "./stravaApiService";

const ActivitiesScreen = () => {
  const { data: activities, isLoading, error } = useStravaActivities();

  const renderActivity = ({ item }) => (
    <View style={styles.activityCard}>
      <Text>{item.name}</Text>
      <Text>Distance: {(item.distance / 1000).toFixed(2)} km</Text>
      <Text>Date: {new Date(item.start_date).toLocaleDateString()}</Text>
    </View>
  );

  if (isLoading) return <Text>Loading activities...</Text>;
  if (error) return <Text>Error fetching activities</Text>;

  return (
    <FlatList
      data={activities}
      renderItem={renderActivity}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  activityCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default ActivitiesScreen;
