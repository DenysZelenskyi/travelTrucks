import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import iconSprite from "../../assets/icons.svg";
import styles from "./CamperCard.module.css";

const CamperCard = ({ camper }) => {
  const maxDescriptionLength = 60;
  const maxNameLength = 22;

  // Ініціалізація стану з localStorage
  const [savedFavorites, setSavedFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  // Стан для перевірки, чи обраний кемпер
  const [isFavorite, setIsFavorite] = useState(
    savedFavorites.includes(camper.id)
  );

  // Оновлення isFavorite, якщо змінився savedFavorites або camper.id
  useEffect(() => {
    setIsFavorite(savedFavorites.includes(camper.id));
  }, [savedFavorites, camper.id]);

  // Обробник для перемикання стану "обране"
  const handleFavoriteClick = () => {
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = savedFavorites.filter((id) => id !== camper.id);
    } else {
      updatedFavorites = [...savedFavorites, camper.id];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setSavedFavorites(updatedFavorites);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const featuresList = [
    { name: "AC", icon: "ac", available: camper.AC },
    {
      name: "Automatic",
      icon: "transmission",
      available: camper.transmission === "automatic",
    },
    { name: "Kitchen", icon: "cup_hot", available: camper.kitchen },
    { name: "TV", icon: "tv", available: camper.TV },
    { name: "Bathroom", icon: "shower", available: camper.bathroom },
    { name: "Petrol", icon: "petrol", available: camper.engine === "petrol" },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.image_placeholder}>
        <img src={camper.gallery[0]?.thumb} alt={camper.name} />
      </div>
      <div className={styles.details}>
        <div className={styles.name_and_price_favorite}>
          <h2 className={styles.name}>
            {truncateText(camper.name, maxNameLength)}
          </h2>
          <div className={styles.price_and_favorite}>
            <p className={styles.price}>
              €{camper.price ? camper.price.toFixed(2) : "N/A"}
            </p>
            <svg
              className={`${styles.favorite_icon} ${
                isFavorite ? styles.active : ""
              }`}
              onClick={handleFavoriteClick}
            >
              <use xlinkHref={`${iconSprite}#icon-heart`}></use>
            </svg>
          </div>
        </div>
        <div className={styles.rating_and_location}>
          <span className={styles.rating}>
            <svg
              className={styles.star_icon}
              style={{
                fill: camper.reviews?.length ? "#ffc531" : "currentColor",
              }}
            >
              <use xlinkHref={`${iconSprite}#icon-rating_star`}></use>
            </svg>
            {camper.rating} ({camper.reviews?.length || 0} Reviews)
          </span>
          <span className={styles.location}>
            <svg className={styles.location_icon}>
              <use xlinkHref={`${iconSprite}#icon-location`}></use>
            </svg>
            {camper.location}
          </span>
        </div>
        <p className={styles.description}>
          {truncateText(camper.description, maxDescriptionLength)}
        </p>
        <div className={styles.features}>
          {featuresList
            .filter((feature) => feature.available)
            .map((feature, index) => (
              <div key={index} className={styles.feature}>
                <svg className={styles.feature_icon}>
                  <use xlinkHref={`${iconSprite}#icon-${feature.icon}`}></use>
                </svg>
                {feature.name}
              </div>
            ))}
        </div>
        <Link
          to={`/catalog/${camper.id}`}
          className={`primary_button ${styles.show_more_button}`}
        >
          Show more
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;
