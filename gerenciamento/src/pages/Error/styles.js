import styled from "styled-components";

export const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;

h1{
    font-family: 'Inter';
    font-size: 40px;
    text-align: center;
}
`

export const ContainerBtn = styled.div`
margin-top: 30px !important;


`

export const Button = styled.button`
  width: 93%;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  height: 44px;
  cursor: pointer;
  font-family: 'Poppins';
  font-size: 16px;
  line-height: 1;
  font-weight: 400;
  transition: background-color 1s;
  height: 50px;
  margin-top: 30px;

  &:hover{
    background-color: #0059B8;
  }
`;