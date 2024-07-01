import { useState } from "react";
import FetchData from "./FetchDataAPI";
import { Link } from "react-router-dom";

export default function FoodCategories() {
  const dataUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      <FetchData url={dataUrl}>
        {({ data, loading, error }) => {
          if (loading) {
            return (
              <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden"></span>
                </div>
                <p className="mt-2">Loading...</p>
              </div>
            );
          }
          if (error) return <div>Error: {error.message}</div>;

          
          return (
            <div className="container my-4 border-2 text-center">
              <div className="row">
                {data.categories.map((category) => (
                  <div className="col-md-6 mb-4" key={category.idCategory}>
                    <div className="card h-100">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <Link
                            to={`/searchpage?term=${category.strCategory}&option=category`}
                          >
                            <img
                              src={
                                category.strCategoryThumb
                                  ? category.strCategoryThumb
                                  : "Image Not Found"
                              }
                              className="card-img-top img-fluid rounded-start"
                              alt={category.strCategory}
                            />
                          </Link>
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">
                              {category.strCategory}
                            </h5>
                            <button
                              className="btn btn-primary"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse${category.idCategory}`}
                              aria-expanded={
                                selectedCategory === category.idCategory
                              }
                              aria-controls={`collapse${category.idCategory}`}
                              onClick={() =>
                                setSelectedCategory(
                                  selectedCategory === category.idCategory
                                    ? null
                                    : category.idCategory
                                )
                              }
                            >
                              {selectedCategory === category.idCategory
                                ? "Show Less"
                                : "Read More"}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`collapse ${
                          selectedCategory === category.idCategory ? "show" : ""
                        }`}
                        id={`collapse${category.idCategory}`}
                        style={{ minHeight: "120px" }} 
                      >
                        <div
                          className="card card-body w-100"
                          style={{ width: "300px" }}
                        >
                          {category.strCategoryDescription}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </FetchData>
    </div>
  );
}
