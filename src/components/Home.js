import React from "react";
import Notes from "./Notes";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  document.title = "CloudBooks - Home";
  const navigate = useNavigate();
  const { showAlert } = props;

  if (!localStorage.getItem("token")) {
    navigate("/login");
  }

  return (
    <>
      <Notes showAlert={showAlert} />
    </>
  );
};

export default Home;
