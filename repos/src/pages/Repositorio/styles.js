import styled from "styled-components";
import { Link } from "react-router-dom";

export const Loading = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items:center;
  height: 100vh;
`;

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 0.25rem;
  box-shadow: 0 0 1.25rem rgba(0,0,0,0.2);
  margin: 5rem auto;
  padding-bottom: 2rem;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;

  img {
    width: 150px;
    border-radius: 20%;
    margin:1.25rem 0;
  }

  h1 {
    font-size: 1.875rem;
    color: #0D2636;
  }

  p {
    margin-top: 5px;
    font-size: 0.875rem;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  }
`;

export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
`;

