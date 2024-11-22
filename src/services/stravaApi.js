import axios from "axios";
import { useQuery } from "react-query";
import { useAuthStore } from "./authStore";

const STRAVA_API_BASE = "https://www.strava.com/api/v3";

export const useStravaActivities = () => {
  const { accessToken } = useAuthStore();

  return useQuery(
    "stravaActivities",
    async () => {
      const response = await axios.get(
        `${STRAVA_API_BASE}/athlete/activities`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: { per_page: 30 },
        }
      );
      return response.data;
    },
    {
      enabled: !!accessToken,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

export const useMonthlyStats = () => {
  const { accessToken } = useAuthStore();

  return useQuery(
    "monthlyStats",
    async () => {
      // Implement monthly aggregation logic
      // This would involve processing activities data
    },
    {
      enabled: !!accessToken,
    }
  );
};
