import styled from 'styled-components';

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

  &:hover{
    background-color: #0059B8;
  }
`;

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const LeftPanel = styled.div`
  flex: 1;
  background: linear-gradient(to right, #007bff, #0056b3);
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginForm = styled.div`
  /* padding: 50px; */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  /* width: 60%; */
  height: 320px;
  width: 70%;


  h1 {
    font-family: 'Poppins';
    font-weight: 500;
    padding: 0 20px;
  }
`;

export const InputData = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 20px;
  /* margin: 0 20px; */
  position: relative;
  font-family: 'Poppins';
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

export const BoxButton = styled.div`
display: flex;
align-items: center;
justify-content: center;
`