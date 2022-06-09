import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./App.css";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

function App() {
  const [avatarUrl, setAvatarUrl] = useState();
  const [githubUsername, setGithubUsername] = useState();
  const [bio, setBio] = useState();
  const [followers, setFollowers] = useState();
  const [siteUrl, setSiteUrl] = useState();
  const [location, setLocation] = useState();
  const [repo, setRepo] = useState();
  const [repoData, setRepoData] = useState();

  async function repoDataURL() {
    fetch("https://api.github.com/users/Dev-SalamSheikh/repos")
      .then((res) => res.json())
      .then((result) => {
        const list = result.map((item, index) => (
          <div key={index}>
            <Card
              border="danger"
              text="white"
              bg="dark"
              style={{ width: "15rem" }}
            >
              <Card.Body>
                <Card.Title>{item.full_name}</Card.Title>
                <Card.Text>
                  {item.description
                    ? item.description
                    : "Description is not avaiable in this Repository"}
                </Card.Text>
                <Card.Text>
                  Repository Link <a href={item.clone_url}>{item.clone_url}</a>
                </Card.Text>
                <Card.Text style={{ color: "red" }}>
                  Default Branch: {item.default_branch}
                </Card.Text>
                <Card.Text style={{ color: "lightblue" }}>
                  Most Used Language: {item.language}
                </Card.Text>
                <Card.Text>Repo Froks: {item.forks_count}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ));
        setRepoData(list);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetch("https://api.github.com/users/Dev-SalamSheikh")
      .then((res) => res.json())
      .then(
        (result) => {
          setAvatarUrl(result.avatar_url);
          setGithubUsername(result.login);
          setBio(result.bio);
          setFollowers(result.followers);
          setSiteUrl(result.blog);
          setLocation(result.location);
          setRepo(result.public_repos);
        },
        (err) => {
          console.log(err);
        }
      );
  }, []);

  return (
    <>
      <Container className="pb-5">
        <div className="App w-100 min-vh-100 d-flex align-items-center flex-wrap justify-content-center gap-4">
          <div className="github_profile_pic">
            <img src={avatarUrl} alt="ProfileImage" />
          </div>
          <div className="github_statistics">
            <h1>
              <span>github.com/</span>
              {githubUsername}
            </h1>
            <span className="bio">{bio}</span>
            <p className="pt-3 pb-0">Total Followers - {followers}</p>
            <span>
              Personal Portfolio -
              <a href="https://salamsheikh.me"> {siteUrl}</a>
            </span>
            <h5 className="lcoation">From - {location}</h5>
            <p
              style={{ color: "crimson", fontSize: "24px" }}
              className="total_repo fw-bold"
            >
              Total Public Repository - {repo}
            </p>
            <Button className="click_button" onClick={repoDataURL}>
              Show My Public Repositories
            </Button>
          </div>
        </div>

        <div className="mt-5 d-flex flex-row flex-wrap align-items-center justify-content-center text-center gap-5">
          {repoData}
        </div>
      </Container>
    </>
  );
}

export default App;
