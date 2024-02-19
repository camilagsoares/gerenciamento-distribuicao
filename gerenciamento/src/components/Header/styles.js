import styled from 'styled-components';

export const Container = styled.div `
height: 60px;
width: 100%;
background-color: white;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

`

export const AlignItems = styled.div `
display: flex;
justify-content: space-between;
`

export const AlignItemsStart = styled.div`
display: flex;
justify-content: start;
align-self: start;

h1{
    font-family: 'Inter', sans-serif;
    font-weight: 300;
}
`