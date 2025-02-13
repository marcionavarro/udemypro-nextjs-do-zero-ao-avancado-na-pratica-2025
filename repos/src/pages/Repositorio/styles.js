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
  padding: 1.5rem;
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

export const IssuesList = styled.ul`
  margin-top: 1.875rem;
  padding-top: 1.875rem;
  border-top: 1px solid #ddd;
  list-style: none;

    li {
      display: flex;
      padding: 0.9375rem 0.625rem;

        & + li {
          margin-top: 0.75rem; 
        }

        img {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          border: 2px solid #0D2636;
        }

        div {
          flex: 1;
          margin-left: 0.75rem;

            p {
              margin-top: 0.625rem;
              font-szie:0.975rem;
              color: #000;
            }

        }

        strong {
          font-size: 0.975rem;

            a {
              text-decoration: none;
              color: #ccc;
              display: block;
              margin-bottom: 0.625rem;

              &:hover {
                color: #0071DB;
                transition: all 0.6s;
              }
            }
          
          span {
            background: #bbb;
            color: #fff;
            border-radius: 0.25rem;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.312rem 0.4375rem;
            margin-right: 0.625rem;
          }
        }
    }
`;

export const PageActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  margin: 0 1rem;

    button {
      outline: 0;
      border: 0;
      background: #ccc;
      color: #fff;
      padding: 0.3125rem 0.625rem;
      margin: 1rem 0;
      border-radius: 0.25rem;

        &:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
    }
`;

export const FilterList = styled.div`
  margin: 0.9375rem 0;

    button {
      outline: 0;
      border: 0;
      padding: 0.5rem;
      border-radius: 0.25rem;
      margin: 0 0.1875rem;

        &:nth-child(${props => props.active + 1}){
          background: #0071db;
          color: #fff;
        }

    }
`;

