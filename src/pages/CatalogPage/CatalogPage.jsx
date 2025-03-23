import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchCampers } from "../../redux/campersSlice";
import CamperCard from "../../components/CamperCard/CamperCard";
import CatalogFilter from "../../components/CatalogFilter/CatalogFilter";
import styles from "./CatalogPage.module.css";
import { STORAGE_KEYS, FILTER_VALUES } from "../../constants/config";

/**
 * CatalogPage component displays a list of campers with filtering capabilities
 * Filters are persisted in localStorage and applied on page load
 */
const CatalogPage = () => {
  const dispatch = useDispatch();
  const { campers, status, error } = useSelector((state) => state.campers);

  // Initialize filters from localStorage or use default empty state
  const [activeFilters, setActiveFilters] = useState(() => {
    const savedFilters = localStorage.getItem(STORAGE_KEYS.FILTERS);
    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          equipment: [],
          vehicleType: [],
          location: "",
        };
  });

  // State for filtered campers list
  const [filteredCampers, setFilteredCampers] = useState([]);

  // Fetch campers data on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCampers());
    }
  }, [dispatch, status]);

  /**
   * Handles changes in equipment and vehicle type filters
   * @param {string} filterType - Type of filter (equipment or vehicleType)
   * @param {string} filterValue - Value of the filter
   */
  const handleFilterChange = (filterType, filterValue) => {
    setActiveFilters((prevFilters) => {
      const isFilterActive = prevFilters[filterType].includes(filterValue);
      const updatedFilters = isFilterActive
        ? prevFilters[filterType].filter((item) => item !== filterValue)
        : [...prevFilters[filterType], filterValue];

      const newFilters = {
        ...prevFilters,
        [filterType]: updatedFilters,
      };

      // Save filters to localStorage on each change
      localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(newFilters));
      return newFilters;
    });
  };

  /**
   * Handles changes in location filter
   * @param {string} location - New location value
   */
  const handleLocationChange = (location) => {
    setActiveFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        location,
      };
      // Save filters to localStorage on location change
      localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(newFilters));
      return newFilters;
    });
  };

  /**
   * Checks if a specific filter is active
   * @param {string} filterType - Type of filter
   * @param {string} filterValue - Value to check
   * @returns {boolean} - Whether the filter is active
   */
  const isActiveFilter = (filterType, filterValue) => {
    return activeFilters[filterType].includes(filterValue);
  };

  /**
   * Applies all active filters to the campers list
   * Filters by equipment, vehicle type, and location
   */
  const applyFilters = () => {
    if (!campers?.items) return;

    const filteredList = campers.items.filter((camper) => {
      // Check if camper matches all selected equipment filters
      const matchesEquipment = activeFilters.equipment.every((filter) => {
        if (filter === FILTER_VALUES.TRANSMISSION) {
          return camper.transmission === FILTER_VALUES.AUTOMATIC;
        }
        return camper[filter] === true;
      });

      // Check if camper matches any selected vehicle type
      const matchesVehicleType =
        !activeFilters.vehicleType.length ||
        activeFilters.vehicleType.some(
          (filter) => filter.toLowerCase() === camper.form.toLowerCase()
        );

      // Check if camper location matches the search location
      const matchesLocation =
        !activeFilters.location ||
        camper.location
          .toLowerCase()
          .includes(activeFilters.location.toLowerCase());

      return matchesEquipment && matchesVehicleType && matchesLocation;
    });

    setFilteredCampers(filteredList);
  };

  // Apply filters when campers data is loaded
  useEffect(() => {
    if (campers?.items) {
      applyFilters();
    }
  }, [campers]);

  // Loading state
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Error state
  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.catalog_container}>
      <CatalogFilter
        onFilterChange={handleFilterChange}
        onLocationChange={handleLocationChange}
        isActiveFilter={isActiveFilter}
        activeFilters={activeFilters}
        onSearch={applyFilters}
      />
      <div className={styles.cards_section}>
        {filteredCampers.length > 0 ? (
          filteredCampers.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))
        ) : (
          <div>No campers found</div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
