import * as React from "react"
import { ContainerTitle, AlignTitle } from './style'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { useState } from "react";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';


export const Postar = () => {



    const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
        box-sizing: border-box;
        width: 520px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
    
     

    
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `,
    );

    return (
        <div>
            <AlignTitle>
                <ContainerTitle>Poste um bem</ContainerTitle>
            </AlignTitle>


            <Box component='form' noValidate>
                <Grid container columnSpacing={2} rowSpacing={2} paddingTop={2}>
                    <Grid item xs={12} sm={12} md={12}>
                        <FormLabel>Título</FormLabel>
                        <TextField fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <FormLabel>Título</FormLabel>
                        <TextField fullWidth />
                    </Grid>

                    <Textarea
                        style={{ resize: 'none' }}
                        maxRows={4}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua."
                    />
                    <Button>Submit</Button>

                </Grid>

            </Box>



        </div>
    )
}