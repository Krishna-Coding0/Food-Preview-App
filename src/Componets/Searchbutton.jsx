import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FetchData from "./FetchDataAPI";

export default function Searchpage() {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [searchParams] = useSearchParams();
  const term = searchParams.get("term");
  const option = searchParams.get("option");
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  let dataurl;

  if (option === "name") {
    dataurl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;
  } else if (option === "area") {
    dataurl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`;
  } else if (option === "ingredients") {
    dataurl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`;
  } else {
    dataurl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`;
  }

  function handleDescription(meal) {
    setSelectedMeal(meal);
  }

  function handleCloseModal() {
    setSelectedMeal(null);
  }

  function toggleFavorite(meal) {
    const isFavorite = favorites.some((fav) => fav.idMeal === meal.idMeal);
    if (!isFavorite && favorites.length >= 5) {
      alert("Only 5 favorites can be added");
      return;
    }

    if (!isFavorite) {
      setFavorites([...favorites, meal]);
    } else {
      setFavorites(favorites.filter((fav) => fav.idMeal !== meal.idMeal));
    }
  }

  return (
    <div>
      <FetchData url={dataurl}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error: {error.message}</div>;

          const meals = data.meals || [];
          if (meals.length === 0) {
            return (
              <p className="text-center m-5 fs-1 p-5" style={{ height: "402px" }}>
                Search Not Found
              </p>
            );
          }

          return (
            <div className="container my-4">
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {meals.map((meal) => (
                  <div className="col" key={meal.idMeal}>
                    <div className="card h-100">
                      <img
                        src={meal.strMealThumb || "Image Not Found"}
                        className="card-img-top"
                        alt={meal.strMeal}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{meal.strMeal}</h5>
                        <p className="card-text">
                          {meal.strInstructions
                            ? meal.strInstructions.slice(0, 50) + "..."
                            : "Instructions not available"}
                        </p>
                      </div>
                      <div className="card-footer">
                        <button
                          className="btn btn-secondary me-2"
                          onClick={() => handleDescription(meal)}
                        >
                          View Details
                        </button>
                        <button
                          className={`btn ${favorites.some(
                            (fav) => fav.idMeal === meal.idMeal
                          )
                            ? "btn-danger"
                            : "btn-outline-danger"
                          }`}
                          onClick={() => toggleFavorite(meal)}
                        >
                          {favorites.some((fav) => fav.idMeal === meal.idMeal)
                            ? "Remove from Favorites"
                            : "Add to Favorites"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </FetchData>

      <div
        className={`modal fade ${selectedMeal ? "show" : ""}`}
        id="mealModal"
        tabIndex="-1"
        aria-labelledby="mealModalLabel"
        aria-hidden={!selectedMeal}
        style={{ display: selectedMeal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            {selectedMeal && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="mealModalLabel">
                    {selectedMeal.strMeal}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>{selectedMeal.strInstructions}</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className={`btn ${favorites.some(
                      (fav) => fav.idMeal === selectedMeal.idMeal
                    )
                      ? "btn-danger"
                      : "btn-outline-danger"
                    }`}
                    onClick={() => toggleFavorite(selectedMeal)}
                  >
                    <i className="fas fa-info"></i> {favorites.some((fav) => fav.idMeal === selectedMeal.idMeal)
                      ? "Remove from Favorites"
                      : "Add to Favorites"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
