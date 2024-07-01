import { useState, useEffect, useMemo } from "react";
import FetchData from "./FetchDataAPI";
import { useNavigate } from "react-router-dom";

export default function FoodCategories() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const navigate = useNavigate();

  const areadata = useMemo(
    () => [
      { strArea: "American" },
      { strArea: "British" },
      { strArea: "Canadian" },
      { strArea: "Chinese" },
      { strArea: "Croatian" },
      { strArea: "Dutch" },
      { strArea: "Egyptian" },
      { strArea: "Filipino" },
      { strArea: "French" },
      { strArea: "Greek" },
      { strArea: "Indian" },
      { strArea: "Irish" },
      { strArea: "Italian" },
      { strArea: "Jamaican" },
      { strArea: "Japanese" },
      { strArea: "Kenyan" },
      { strArea: "Malaysian" },
      { strArea: "Mexican" },
      { strArea: "Moroccan" },
      { strArea: "Polish" },
      { strArea: "Portuguese" },
      { strArea: "Russian" },
      { strArea: "Spanish" },
      { strArea: "Thai" },
      { strArea: "Tunisian" },
      { strArea: "Turkish" },
      { strArea: "Ukrainian" },
      { strArea: "Unknown" },
      { strArea: "Vietnamese" },
    ],
    []
  );

  const randomIndex = useMemo(
    () => Math.floor(Math.random() * areadata.length),
    [areadata]
  );
  const dataUrl = useMemo(
    () =>
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areadata[randomIndex].strArea}`,
    [areadata, randomIndex]
  );

  const handleFavoriteClick = (meal) => {
    const isFavorite = favorites.some(
      (favorite) => favorite.idMeal === meal.idMeal
    );
    if (isFavorite) {
      setFavorites(
        favorites.filter((favorite) => favorite.idMeal !== meal.idMeal)
      );
    } else {
      if (favorites.length >= 5) {
        alert("Only 5 favorites can be added");
      } else {
        setFavorites([...favorites, meal]);
      }
    }
  };

  const handleInfo = (id) => {
    navigate(`/foodinfo?id=${id}`);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        {areadata[randomIndex].strArea} Cuisine
      </h1>
      <div>
        <FetchData url={dataUrl}>
          {({ data, loading, error }) => {
            if (loading) {
              return (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading...</p>
                </div>
              );
            }
            if (error)
              return <div className="text-center">Error: {error.message}</div>;

            return (
              <>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                  {data["meals"].map((meal) => (
                    <div key={meal.idMeal} className={`col ${data["meals"].length === 1 ? "mx-auto" : ""}`}>
                      <div className="card h-100">
                        <img
                          src={meal.strMealThumb}
                          className="card-img-top img-fluid"
                          alt={meal.strMeal}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{meal.strMeal}</h5>
                          <p className="card-text">
                            {meal.strInstructions
                              ? `${meal.strInstructions.slice(0, 100)}...`
                              : "Instructions not available"}
                          </p>
                        </div>
                        <div className="card-footer d-flex justify-content-between align-items-center">
                          <button
                            className={`btn ${
                              favorites.some(
                                (favorite) => favorite.idMeal === meal.idMeal
                              )
                                ? "btn-danger"
                                : "btn-outline-dark"
                            }`}
                            onClick={() => handleFavoriteClick(meal)}
                          >
                            <i className="fa fa-heart"></i> Favorite
                          </button>
                          <button
                            className="btn btn-dark"
                            onClick={() => handleInfo(meal.idMeal)}
                          >
                            <i className="fas fa-info"></i> Info
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );
          }}
        </FetchData>
      </div>
    </div>
  );
}
