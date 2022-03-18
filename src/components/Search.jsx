import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/searched/${input}`);
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
      <div>
        <FaSearch />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  margin: 1rem 0;
  div {
    width: 70%;
    margin-inline: auto;
    position: relative;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: #fff;
    padding: 1rem 3rem;
    border-radius: 1rem;
    outline: none;
    width: 100%;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: #fff;
  }
`;

export default Search;
