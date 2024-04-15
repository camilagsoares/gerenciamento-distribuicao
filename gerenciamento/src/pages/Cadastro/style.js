import styled from "styled-components";
import TextField from '@mui/material/TextField';

export const AlignContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100vh; 
`
export const ContainerSignUp = styled.div`
background-color: #fff;
border-radius: 8px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

@media only screen and (min-width : 768px) {
  width: 60%;
}

@media only screen and (min-width:320px) and (max-width: 767px) {
  width: 80%;
}

h1  {
    font-family: 'Poppins';
    font-weight: 500;
    padding: 0 20px;
  } 
`

export const Button = styled.button`
  width: 97%;
  background-color: #007bff;
  color: #fff;
  border: none;
  margin-left: 13px;
  border-radius: 4px;
  height: 44px;
  cursor: pointer;
  font-family: 'Poppins';
  font-size: 16px;
  line-height: 1;
  font-weight: 400;
  transition: background-color 1s;
  height: 50px;

  &:hover{
    background-color: #0059B8;
  }
`;


export const InputData = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 20px;
  /* margin: 0 20px; */
  position: relative;
  font-family: 'Poppins';
  margin-bottom: 20px; 
`;

export const Underline = styled.div`
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 100%;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 17px;
  border-bottom: 2px solid rgba(0,0,0, 0.12);
  outline: none;
  font-family: 'Poppins';

  &:focus ~ label,
  &:valid ~ label {
    transform: translateY(-20px);
    font-size: 14px;
    color: #3498db;
  }
`;

export const Label = styled.label`
  position: absolute;
  pointer-events: none;
  bottom: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
`;



export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0;
`;

