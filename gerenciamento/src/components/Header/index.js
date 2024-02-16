import React, { useState } from "react"
import { Container, AlignItems } from "./styles";
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { HeaderLateral } from '../HeaderLateral/index'
import { Link } from 'react-router-dom'



export const Header = () => {

    const [open, setOpen] = useState(false);


    return (
        <Container>

            <AlignItems>
                <Button onClick={() => setOpen(!open)}> <MenuIcon /></Button>

                <div>
                    <Button>
                        <Link to="/login">Login</Link>
                    </Button>

                    <Button>
                        <Link to="/cadastro">  Cadastro</Link>
                    </Button>
                </div>

            </AlignItems>

            {open && <HeaderLateral /> }
        </Container>
    )
}