import styled from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  margin: 5rem auto;
  padding: 1.875rem;

    h1 {
      font-size: 1.25rem;
      display: flex;
      flex-direction: row;
      align-items:center;

        svg {
          margin-right: 0.625rem
        }
    }
`;

export const Form = styled.form`
  margin-top: 1.875rem;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #DDD;
    padding: 0.625rem 0.9375rem;
    font-size: 1rem;
  }
`;

export const SubmitButton = styled.button`
  background: #0D2636;
  border: 0;
  border-radius: 4px;
  margin-left: 0.625rem;
  padding: 0 0.9375rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;