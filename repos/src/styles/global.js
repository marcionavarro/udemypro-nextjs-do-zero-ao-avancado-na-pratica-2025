import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline:0;
  box-sizing: border-box;
}

html, body, #root {
  min-height: 100%;
}
  
body {
  background: #0D2636;
  font-size: 1rem;
  -webkit-font-smoothing: antialiased !importe;
}

body, input, button {
  color: #222;
  font-size: 1rem;
  font-family: Arial, helvetica, sans-serif
}

button {
  cursor: pointer;
}
`;