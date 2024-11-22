// src/utils/constants.js

// API Base URLs
export const STRAVA_API_BASE_URL = "https://www.strava.com/api/v3";
export const STRAVA_AUTH_URL = "https://www.strava.com/oauth/authorize";
export const STRAVA_TOKEN_URL = "https://www.strava.com/oauth/token";

// Auth Configuration
export const AUTH_CONFIG = {
  clientId: process.env.STRAVA_CLIENT_ID,
  clientSecret: process.env.STRAVA_CLIENT_SECRET,
  redirectUri: "stravatracker://oauth-callback",
  scopes: ["read", "activity:read_all", "profile:read_all"],
};

// API Endpoints
export const ENDPOINTS = {
  activities: "/athlete/activities",
  athlete: "/athlete",
  activity: (id) => `/activities/${id}`,
};

// Query Keys
export const QUERY_KEYS = {
  activities: "activities",
  monthlyStats: "monthlyStats",
  athlete: "athlete",
};

// Cache Time Configuration (in milliseconds)
export const CACHE_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 30 * 60 * 1000, // 30 minutes
};

// Error Messages
export const ERROR_MESSAGES = {
  networkError:
    "Network connection error. Please check your internet connection.",
  authError: "Authentication error. Please login again.",
  serverError: "Server error. Please try again later.",
  rateLimitError: "Too many requests. Please try again later.",
};

// Activity Types
export const ACTIVITY_TYPES = {
  RUN: "Run",
  RIDE: "Ride",
  SWIM: "Swim",
  WALK: "Walk",
  HIKE: "Hike",
};

// Units
export const UNITS = {
  distance: {
    metric: "kilometers",
    imperial: "miles",
  },
  elevation: {
    metric: "meters",
    imperial: "feet",
  },
  speed: {
    metric: "km/h",
    imperial: "mph",
  },
};

// Utility Functions
export const formatDistance = (meters, useMetric = true) => {
  if (useMetric) {
    return `${(meters / 1000).toFixed(2)} km`;
  }
  return `${(meters * 0.000621371).toFixed(2)} mi`;
};

export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Pagination
export const PAGINATION = {
  defaultLimit: 30,
  maxLimit: 100,
};

// UI Constants
export const UI_CONSTANTS = {
  colors: {
    stravaOrange: "#FC4C02",
    primary: "#FC4C02",
    secondary: "#999999",
    background: "#FFFFFF",
    text: "#242424",
    error: "#DC3545",
    success: "#28A745",
    warning: "#FFC107",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};
