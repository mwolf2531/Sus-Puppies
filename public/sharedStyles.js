import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400&family=Zen+Kaku+Gothic+Antique:wght@300;700&display=swap');
  * {
    font-family: 'Zen Kaku Gothic Antique', sans-serif;
    font-weight: 100;
    color: red;
  }
`;

export const SectionHeader = styled.div`
  font-weight: 700;
`;
