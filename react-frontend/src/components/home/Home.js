import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import "./Home.css";
import { useLoggedInStore } from "../../app/store";
import MemeListContainer from "../overview/MemeListContainer/MemeListContainer";
import MemeService from "../../services/memeService";

function Home() {
  const [userName, setUserName] = useState("");
  const [memes, setMemes] = useState([]);
  const isAuthenticated = useLoggedInStore((state) => state.loggedIn);
  const memeService = new MemeService();

  const [filter, setFilter] = useState({
    title: "",
    creator: "",
    likes: "",
    dislikes: "",
    comments: "",
    creationDate: "",
  });

  const fetchMemes = async () => {
    const allMemes = await memeService.retrieveMemes(2);
    //const newMemes = allMemes.slice(0, 2);
    setMemes(allMemes);
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      let userData = JSON.parse(localStorage.getItem("loginData"));
      setUserName(userData.name);
    } else {
      setUserName("");
    }
  }, [isAuthenticated]);
  return (
    <Container className="index-root">
      <Row>
        <Col>
          <h1>Welcome back {userName}</h1>
        </Col>
      </Row>
      <Row className="index-fast-actions-container">
        <Col className="index-fast-actions shadow rounded">Create new Meme</Col>
        <Col className="index-fast-actions shadow rounded">
          <Container>Search for Memes</Container>
        </Col>
        <Col className="index-fast-actions shadow rounded">
          <Container>View Profil</Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="index-header">Latest public memes</h4>
          <Container className="index-container">
            <MemeListContainer
              memes={memes}
              filter={filter}
              fetchMemes={fetchMemes}
            ></MemeListContainer>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="index-header">Latest Users</h4>
          <Container className="index-container">
            Hier kommen die neuesten Nutzer rein
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="index-header">Most popular memes</h4>
          <Container className="index-container">
            Hier kommen die am meisten gelikten public memes rein im gleiche
            Template wie im Overview etc.
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
