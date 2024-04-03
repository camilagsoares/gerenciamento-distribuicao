import styled from "styled-components";


export const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-family: 'Poppins', sans-serif;
margin: 0 auto;
margin-top: 48px;
`;

export const InnerContainer = styled.div`

@media (max-width:480px){
  display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    max-width: 900px; 
    width: 100%;
    background: #fff;
    margin: 20px;
    padding: 20px; 
}

@media (min-width: 481px) and (max-width: 767px) {
  display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    max-width: 900px; 
    width: 100%;
    background: #fff;
    margin: 20px;
    padding: 20px; 
  }

          
@media (min-width: 768px) and (max-width: 1024px){
  display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    max-width: 900px; 
    width: 100%;
    background: #fff;
    margin: 20px;
    padding: 20px; 
}

@media (min-width:1025px){
display: flex;
flex-wrap: wrap;
justify-content: space-between;
width: 900px;
height: 600px;
background: #fff;
margin: 20px;
}



    
`;

export const ImgBox = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;
width: 50%;
height: 100%;
background: ${props => props.backgroundColor};
transition: .3s linear;


@media (max-width:480px){

    width: 100%; 
    height: auto; 
   
}

`;

export const Image = styled.img`
position: relative;
max-width:100%;
`;

export const Details = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 50%;
height: 100%;
box-sizing: border-box;
padding: 40px;


@media (max-width:480px){
  display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    width: 100%; 
    box-sizing: border-box;
    padding: 20px;
}

`;

export const Content = styled.div``;

export const Title = styled.h2`
margin: 0;
padding: 0;
font-size: 2.4em;
line-height: 1em;
color: ${props => props.color};

@media (max-width:480px){
  text-align: center; 
}

`;

export const Subtitle = styled.span`
font-size: 0.4em;
text-transform: uppercase;
letter-spacing: 2px;
color: #999;
`;

export const Description = styled.p`
max-width: 85%;
margin-left: 15%;
color: #333;
font-size: 15px;
margin-bottom: 36px;

@media (max-width:480px){
    max-width: 100%; 
    margin: 20px 0; 
    color: #333;
    font-size: 15px;
    text-align: center; 
}
`;

export const ButtonStyle = styled.button`
background: #318CE7;
color: #fff;
border: none;
outline: none;
padding: 15px 20px;
margin-top: 5px;
font-size: 16px;
letter-spacing: 1px;
text-transform: uppercase;
font-weight: 300;
font-family: 'Poppins';
border-radius: 40px;
float: right;
transition: background-color 1s;

&:hover{
  background-color: #0058B8;
}
`;