import styled from "styled-components";

export const Product = styled.div`
width: 1148px;
margin: 0 auto;
margin-top: 48px;
display: flex;
`;

export const ProductImages = styled.div`
flex-grow: 2;
position: relative;
overflow: hidden;
`;

export const ImageOverlay = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: #e1e1e1;
`;

export const ProductImageWrapper = styled.div`
width: 100%;
height: 100%;
overflow: hidden;
`;

export const ProductImage = styled.img`
width: 100%;
height: 100%;
object-fit: contain;
`;

export const ProductDetails = styled.div`
flex-grow: 1; 
padding-left: 28px;
`;

export const BtnPrimary = styled.button`
background-color: #0058b8;
color: #ffffff;
padding: 20px 60px;
margin-top: 170px;
border: none;
border-radius: 2px;

&:hover {
  background-color: #0077f7;
}
`

export const Cta = styled.div`
display: flex;
width: 100%;
margin: 40px 0;
`;