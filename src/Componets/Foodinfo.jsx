import { useSearchParams } from "react-router-dom";
import FetchData from "./FetchDataAPI";

export default function FoodInfo() {
  const [searchParams] = useSearchParams();
  const mealId = searchParams.get("id");
  const dataUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

  return (
    <div className="container mt-5">
      <FetchData url={dataUrl}>
        {({ data, loading, error }) => {
          if (loading) return <div className="text-center">Loading...</div>;
          if (error) return <div className="text-center">Error: {error.message}</div>;

          const meal = data?.meals?.[0];

          return (
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card shadow-sm">
                  <img
                    src={meal.strMealThumb}
                    className="card-img-top rounded-top"
                    alt={meal.strMeal}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h1 className="card-title text-center mb-4">{meal.strMeal}</h1>
                    <div className="row">
                      <div className="col-md-6">
                        <h4 className="card-title mb-3">Ingredients:</h4>
                        <ul className="list-group list-group-flush">
                          {getIngredientsList(meal)}
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <h4 className="card-title mb-3">Description:</h4>
                        <p className="card-text text-muted">{meal.strInstructions}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </FetchData>
    </div>
  );
}

const getIngredientsList = (meal) => {
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }
  return ingredients.map((ingredient, index) => (
    <li key={index} className="list-group-item">{ingredient}</li>
  ));
};
