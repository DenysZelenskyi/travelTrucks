/**
 * API configuration
 * Contains base URL and endpoint definitions
 */
export const API_CONFIG = {
  BASE_URL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
  ENDPOINTS: {
    CAMPERS: "/campers",
    CAMPER_BY_ID: (id) => `/campers/${id}`,
  },
};

/**
 * Local storage keys for persisting application state
 */
export const STORAGE_KEYS = {
  FILTERS: "camperFilters",
  FAVORITES: "favorites",
};

/**
 * Filter types used in the application
 */
export const FILTER_TYPES = {
  EQUIPMENT: "equipment",
  VEHICLE_TYPE: "vehicleType",
  LOCATION: "location",
};

/**
 * Filter values used in the application
 */
export const FILTER_VALUES = {
  TRANSMISSION: "transmission",
  AUTOMATIC: "automatic",
};

/**
 * Available equipment filters with their display labels and icons
 */
export const EQUIPMENT_FILTERS = [
  { label: "AC", icon: "ac", value: "AC" },
  { label: "Automatic", icon: "transmission", value: "transmission" },
  { label: "Kitchen", icon: "cup_hot", value: "kitchen" },
  { label: "TV", icon: "tv", value: "TV" },
  { label: "Bathroom", icon: "shower", value: "bathroom" },
];

/**
 * Available vehicle type filters with their display labels and icons
 */
export const VEHICLE_TYPE_FILTERS = [
  { label: "Van", icon: "grid_1_2", value: "panelTruck" },
  { label: "Fully Integrated", icon: "grid_2_2", value: "fullyIntegrated" },
  { label: "Alcove", icon: "grid_3_3", value: "alcove" },
];
