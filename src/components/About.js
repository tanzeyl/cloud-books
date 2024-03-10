import "../About.css";
import Profile from "./image.jpg";
import { Link } from "react-router-dom";

const About = () => {
  document.title = "CloudBooks - About";

  return (
    <>
      <section className="mainSection">
        <div className="container2">
          <div className="content">
            <img
              alt="Profile"
              src={Profile}
              width={"150px"}
              height={"150px"}
              className="profileImage"
            />
            <p className="mainName">Tanzeel Khan</p>
            <p className="tagline">ML Enthusiast & Web Developer</p>
            <div className="icons">
              <Link to="/" className="icon" style={{ background: "#3b5998" }}>
                <i className="bi bi-facebook"></i>
              </Link>
              <Link to="/" className="icon" style={{ background: "#d62976" }}>
                <i className="bi bi-instagram"></i>
              </Link>
              <Link to="/" className="icon" style={{ background: "#00acee" }}>
                <i className="bi bi-twitter"></i>
              </Link>
            </div>
            <div>
              <button className="button">Subscribe</button>
              <button className="button">Message</button>
            </div>
            <div className="footer">
              <ul>
                <li>
                  <i className="bi bi-heart"></i>&nbsp;&nbsp;60K
                </li>
                <li>
                  <i className="bi bi-chat-right"></i>&nbsp;&nbsp;20K
                </li>
                <li>
                  <i className="bi bi-share"></i>&nbsp;&nbsp;50K
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
