import styled, { css, keyframes } from "styled-components";

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

// Criando animação do botão
const animate = keyframes`
  from{
    tranform: rotate(0deg);
  }
  to{
    transform: rotate(360deg)
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading
}))`
  background: #0D2636;
  border: 0;
  border-radius: 4px;
  margin-left: 0.625rem;
  padding: 0 0.9375rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled]{
    cursor: not-allowed;
    opacity: 0.5; 
  }

  ${props => props.loading &&
    css`
      svg{
        animation: ${animate} 2s linear infinite
      }
    `}
`;

export const List = styled.ul`
    list-style: none;
    margin-top: 1.25rem;

      li {
        padding: 0.9375rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        & + li {
          border-top: 1px solid #eee;
        }

        a {
          color: #0D2636;
          text-decoration: none;
        }
      }
`;

export const DeleteButton = styled.button.attrs({
  type: 'button'
})`
    margin-right: 10px;
    padding: 0.5rem 0.4375rem;
    padding: 0.54rem
    background: transparent;
    color: #0D2636;
    border: 0;
    outline: 0;
    border-radius: 0.25rem;
`;