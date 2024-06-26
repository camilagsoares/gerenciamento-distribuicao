import React from "react";
import styled from 'styled-components'
import { TextField } from '@mui/material';

export const Container = styled.div`
  position: relative;
  width: 60%; 
  margin: auto ;
  margin-top: 10px;
`;

export const Card = styled.div`
  /* height: 700px; */
  position: relative;
  background: ${props => props.alt ? 'none' : '#ffffff'};
  border-radius: 5px;
  padding: ${props => props.alt ? '0' : '5vw 0 3vw 0'};
  box-sizing: border-box;
  box-shadow: ${props => props.alt ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'};
  transition: .3s ease;
`;

export const Title = styled.h1`
  position: relative;
  z-index: 1;
  border-left: 5px solid ${props => props.color ? props.color : '#ed2553'};
  margin: 0 0 35px;
  padding: 10px 0 10px 50px;
  color: ${props => props.color ? props.color : '#ed2553'};
  font-size: 32px;
  font-weight: 600;
  font-family: 'Poppins';
  font-weight: 400;
  text-transform: uppercase;
`;



export const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  color: ${props => props.color ? props.color : '#757575'};
  font-size: 24px;
  font-weight: 300;
  line-height: 60px;
  transition: 0.2s ease;
`;



export const ArrowIcon = styled.div`
  position: absolute;
  top: 90px;
  right: -20px;
  transform: translateY(-50%);
  background-color: #1976D2;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TitleContainer = styled.div`
  text-align: center;
  padding-bottom: 15px;
`;

export const InputField = styled.div`
 position: relative;
  margin-bottom: 20px;
  margin-right: 20px; 
  margin-left: 20px;

  .icon {
    color: #757575; 
  }

  .icon.clicked {
    color: #5ea8f2; 
  }

`;

export const Input = styled(TextField)`
  && {
    width: 100%;
    & input {
      padding-left: 30px;
    }
  }
`;

export const ContainerButton = styled.div`
margin-top: 10px;
margin-bottom: 20px;
margin-right: 20px; 
 margin-left: 20px;
`

export const ContainerSelect = styled.div`
margin-top: 10px;
margin-bottom: 20px;
margin-right: 20px; 
margin-left: 20px;
`

// export const TextArea = styled.textarea`
//   width: 100%;
//   max-height: 400px; 
//   resize: none;
//   overflow-y: auto; 
//   font-family: 'Poppins';
//   color: #757575;
//   border: 1px solid #BDBDBD;
//   border-radius: 5px; 
//   padding: 10px; 

//   outline: none; 

//   &:focus {
//     outline: none; 
//   }
// `;

export const CardInput = styled.div`
margin-top: 10px;

input[type="file"] {
    display: none;
}
label {
    padding: 15px 10px;
    width: 200px;
    background-color: #333;
    color: #FFF;
    text-transform: uppercase;
    text-align: center;
    display: block;
    margin-top: 10px;
    cursor: pointer;
}
`

export const FileInput = styled.input`
display: none;
`;

export const LabelUpload = styled.label`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 1rem;
background: #fff;
border-radius: 7px;
border: 3px solid #eee;
cursor: pointer;
width: 100%;
margin-top: 32px;

&:hover {
  border-color: #c1d8ee;
  transition: border-color 0.3s ease-in-out; 
}

.MuiSvgIcon-root {
  margin-bottom: 0.5rem;
}
`;

export const FileImage = styled.img`
display: ${({ preview }) => preview ? 'inline' : 'none'};
margin: 0 auto .5rem auto;
width: auto;
height: auto;
max-width: 180px;

`;
