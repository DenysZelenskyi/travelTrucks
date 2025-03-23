import styles from "./CatalogFilter.module.css";
import iconSprite from "../../assets/icons.svg";
import {
  EQUIPMENT_FILTERS,
  VEHICLE_TYPE_FILTERS,
  FILTER_TYPES,
} from "../../constants/config";

/**
 * CatalogFilter component provides filtering options for the camper catalog
 * Includes filters for equipment, vehicle type, and location
 */
const CatalogFilter = ({
  onFilterChange,
  onLocationChange,
  isActiveFilter,
  onSearch,
}) => {
  return (
    <div className={styles.filter_section}>
      {/* Location search input */}
      <div className={styles.location}>
        <label htmlFor="location" className={styles.label}>
          Location
        </label>
        <div className={styles.input_container}>
          <svg className={styles.icon}>
            <use xlinkHref={`${iconSprite}#icon-location`}></use>
          </svg>
          <input
            type="text"
            id="location"
            placeholder="Kyiv, Ukraine"
            className={styles.search_input}
            onChange={(e) => onLocationChange(e.target.value)}
          />
        </div>
      </div>

      {/* Equipment filters section */}
      <h3 className={styles.filters_title}>Filters</h3>
      <div className={styles.filter_category}>
        <h4 className={styles.category_title}>Vehicle Equipment</h4>
        <div className={styles.options}>
          {EQUIPMENT_FILTERS.map((filter) => (
            <button
              key={`${filter.value}-${isActiveFilter(
                FILTER_TYPES.EQUIPMENT,
                filter.value
              )}`}
              className={`${styles.option} ${
                isActiveFilter(FILTER_TYPES.EQUIPMENT, filter.value)
                  ? styles.active_option
                  : ""
              }`}
              onClick={() =>
                onFilterChange(FILTER_TYPES.EQUIPMENT, filter.value)
              }
            >
              <svg className={styles.option_icon}>
                <use xlinkHref={`${iconSprite}#icon-${filter.icon}`}></use>
              </svg>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle type filters section */}
      <div className={styles.filter_category}>
        <h4 className={styles.category_title}>Vehicle Type</h4>
        <div className={styles.options}>
          {VEHICLE_TYPE_FILTERS.map((filter) => (
            <button
              key={`${filter.value}-${isActiveFilter(
                FILTER_TYPES.VEHICLE_TYPE,
                filter.value
              )}`}
              className={`${styles.option} ${
                isActiveFilter(FILTER_TYPES.VEHICLE_TYPE, filter.value)
                  ? styles.active_option
                  : ""
              }`}
              onClick={() =>
                onFilterChange(FILTER_TYPES.VEHICLE_TYPE, filter.value)
              }
            >
              <svg className={styles.option_icon}>
                <use xlinkHref={`${iconSprite}#icon-${filter.icon}`}></use>
              </svg>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search button */}
      <div className={styles.search_button_container}>
        <button
          className={`${styles.search_button} primary_button`}
          onClick={onSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default CatalogFilter;
