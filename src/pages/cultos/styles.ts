import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
`;

export const CultoContainer = styled.a`
  background-color: white;
  color: black;
  border: 2px solid black;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-bottom: 8px;

  :hover {
    background: lightgray;
  }
`;
