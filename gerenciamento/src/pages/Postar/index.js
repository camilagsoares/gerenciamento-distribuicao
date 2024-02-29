import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Person, ArrowDropDown } from '@mui/icons-material';
import { Select, MenuItem, InputLabel, InputAdornment } from '@mui/material';
import { Container, Card, ArrowIcon, Title, InputField, Input, ContainerButton, ContainerSelect, TextArea, CardInput } from './style'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import InboxIcon from '@mui/icons-material/Inbox';
import DateRangeIcon from '@mui/icons-material/DateRange';

const Postar = () => {


    const handleToggleClick = () => {
    };


    return (
        <Container>
            <Card>
                <ArrowIcon>
                    <EditIcon style={{ color: 'white' }} />
                </ArrowIcon>
                <Title color="#1976D2">Poste um bem</Title>

                <form>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <InputField>
                                <Input
                                    type="email"
                                    name="email"
                                    label="Nome"
                                    required
                                    fullWidth

                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FeaturedPlayListIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </InputField>
                        </Grid>
                        <Grid item xs={6}>
                            <InputField>
                                <Input
                                    type="text"
                                    name="password"
                                    label="N° do Patrimônio"
                                    required
                                    fullWidth

                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ConfirmationNumberIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </InputField>
                        </Grid>
                        <Grid item xs={6}>
                            <InputField>
                                <Input
                                    type="text"
                                    name="password"
                                    label="Modelo"
                                    required

                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <InboxIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </InputField>
                        </Grid>
                        <Grid item xs={6}>
                            <InputField>
                                <Input
                                    type="text"
                                    name="name"
                                    label="Data disponibilidade"

                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <DateRangeIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </InputField>
                        </Grid>


                    </Grid>

                    <InputField>
                        <TextArea
                            name="description"
                            placeholder="Descrição"
                            rows={9}
                        />
                    </InputField>

                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <ContainerSelect>
                                <InputLabel id="select-country">Tipo</InputLabel>
                                <Select
                                    labelId="select-country"
                                    label="Select a country"
                                    IconComponent={ArrowDropDown}
                                    fullWidth
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Eletrodoméstico</MenuItem>
                                    <MenuItem value={20}>Hospitalar</MenuItem>
                                </Select>
                            </ContainerSelect>


                        </Grid>

                        <Grid item xs={6}>
                            <ContainerSelect>
                                <InputLabel id="select-photo">Foto</InputLabel>

                                <CardInput>
                                    <input
                                        accept="image/*"
                                        id="select-photo"
                                        type="file"
                                        style={{ width: '100%' }}
                                    />
                                </CardInput>
                            </ContainerSelect>

                        </Grid>

                    </Grid>

                    <ContainerButton>
                        <Button variant="outlined" type="submit" fullWidth style={{ height: '50px' }}>Postar</Button>
                    </ContainerButton>
                </form>
            </Card>

        </Container>
    );
};

export default Postar;
