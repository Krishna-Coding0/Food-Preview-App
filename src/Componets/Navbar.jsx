import { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import FoodIcon from "./food-icon.svg"; 

export default function Navbar() {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("name");
  const [eithertextoroption, seteithertextoroption] = useState("");
  const navigate = useNavigate();
  const errorModalRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      seteithertextoroption("Text Not Entered");
      showModal();
    } else {
      navigate(`/searchpage?term=${inputValue}&option=${selectedOption}`);
    }
  };

  const showModal = () => {
    const modal = new window.bootstrap.Modal(errorModalRef.current);
    modal.show();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={FoodIcon} alt="Food Icon" className="food-icon bg-light" style={{width: 30, height: 30, marginRight: 10 ,borderRadius: "50%"}} />
          Food
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                to="/foodcategory"
              >
                Category
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                to="/Favoritepage"
              >
                <i className="fa fa-heart"> Favorite</i>
              </NavLink>
            </li>
          </ul>

          <form className="d-flex" onSubmit={handleSearch}>
            <div className="input-group" style={{ maxWidth: "300px" }}>
              <select
                className="form-select form-select-sm"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="area">Area</option>
                <option value="ingredients">Ingredients</option>
              </select>
              <input
                className="form-control form-control-sm me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button className="btn btn-outline-success btn-sm" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className="modal fade"
        ref={errorModalRef}
        tabIndex="-1"
        aria-labelledby="errorModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content text-center">
            <div className="modal-header justify-content-center">
              <h5 className="modal-title" id="errorModalLabel">
                {eithertextoroption}
              </h5>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
