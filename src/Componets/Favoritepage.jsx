import { useEffect, useState } from "react";
import "./Favoritepage.css";

export default function Favoritepage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritesFromLocalStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favoritesFromLocalStorage);
  }, []);

  const removeFavorite = (idMeal) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.idMeal !== idMeal
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorite-page">
      <div className="favorites-list-container">
        {favorites.length === 0 ? (
          <p className="empty-message">No favorites added yet.</p>
        ) : (
          <>
            <h1 className="page-title">Favorite Meals</h1>
            <div className="favorites-grid">
              {favorites.map((favorite) => (
                <div key={favorite.idMeal} className="favorite-item">
                  <img
                    className="meal-image"
                    src={favorite.strMealThumb}
                    alt={favorite.strMeal}
                  />
                  <div className="meal-details">
                    <h3 className="meal-name">{favorite.strMeal}</h3>
                    <p className="meal-id">ID: {favorite.idMeal}</p>
                    <button
                      className="remove-button"
                      onClick={() => removeFavorite(favorite.idMeal)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
