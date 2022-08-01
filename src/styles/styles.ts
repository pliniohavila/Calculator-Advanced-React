import styled from 'styled-components'

interface ButtonProps {
    simple?: boolean
}


export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    min-width: 45vw; 
    min-height: 55vh;
    border-radius: 8px;
    background-color: #aaa;
    overflow: clip;
`

export const Title = styled.h1`
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.6;
    height: 3.8rem;
    width: 100%;
    background-color: #fafcff;
    color: #202124;
`

export const Display = styled.input`
    width: 97%;
    height: 4.3rem;
    font-size: 2.2rem;
    font-weight: 700;
    outline: none;
    border: none;
    text-align: right;
    margin: 0.5rem;
    padding-right: 0.5rem;
    letter-spacing: 0.2rem;
    background-color: #ecf0f3;
    border-radius: 6px;
`

export const ButtonsGroup = styled.div`
    width: 100%;
    margin: 1.7rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const Button = styled.button<ButtonProps>`
    width: 80px;
    height: 30px;
    border: none;
    outline: none;
    margin: 5px;
    border-radius: 0px;
    line-height: 1.6;
    background-color: ${(props) => props.simple ? "#fafcff" : "#202124"};
    color: ${(props) => props.simple ? "#202124" : "#fafcff"};

    &:hover {
        opacity: 0.7;
    }
    &:active {
        opacity: 0.5;
    }
`