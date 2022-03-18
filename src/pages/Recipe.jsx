import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const params = useParams();
  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=490569b58dd14ea08745af118424423b`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h2>{details.title}</h2>
        <img style={{ maxWidth: "25rem" }} src={details.image} alt="" />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ing) => (
              <li key={ing.id}>{ing.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid #000;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 3rem;

  h3 {
    font-size: 1.2rem;
    color: #333;

    &:last-of-type {
      color: #555;
    }
  }
`;

export default Recipe;
