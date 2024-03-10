import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  document.title = "CloudBooks - Sign Up";
  const url = "http://localhost:5000";

  const navigate = useNavigate();

  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    state: "",
    city: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: details.name,
        email: details.email,
        password: details.password,
        country: details.country,
        state: details.state,
        city: details.city,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      console.log("Failure");
    }
  };

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title text-center">
                  Signup to use CloudBooks
                </h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      required
                      onChange={onChange}
                      minLength={5}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      required
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      required
                      minLength={8}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="cpassword"
                      name="cpassword"
                      required
                      minLength={8}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <select
                      className="form-select"
                      id="country"
                      name="country"
                      required
                      onChange={onChange}
                    >
                      <option value="">Select Country</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="India">India</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      name="state"
                      required
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      required
                      onChange={onChange}
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
