import React, { useEffect, useState } from "react"
import { remoteGetNegociacoesUseCase } from '../../../domain/useCases/remote-negociacoes-useCase'
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Chip, TableContainer } from '@mui/material'


export default function NegociacoesTable() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchNegociacoes = async () => {
            await remoteGetNegociacoesUseCase()
                .then((response) => {
                    setData(response)
                }).catch((error) => {
                    console.log(error)
                }).finally(() => {
                    setLoading(false)
                })
        }
        fetchNegociacoes()
    }, [])
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, borderRadius: 5, border: 2, borderColor: '#A4D3EE' }} >
                <TableHead sx={{ backgroundColor: '#B0E2FF', }}>
                    <TableRow >
                        <TableCell align="left" >Fase atual</TableCell>
                        <TableCell align="left">Titulo</TableCell>
                        <TableCell align="left">Vendedor</TableCell>
                        <TableCell align="left">Cliente</TableCell>
                        <TableCell align="left">Fechamento esperado</TableCell>
                        <TableCell align="left">Tags</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell align="left">{row?.Group?.name}</TableCell>
                            <TableCell align="left">{row?.name}</TableCell>
                            <TableCell align="left">{row?.Vendedor?.name}</TableCell>
                            <TableCell align="left">{row?.Cliente?.name} {row?.Cliente?.lastname}</TableCell>
                            <TableCell align="left">{row.closeExpect || 'vazio'}</TableCell>
                            {!row.Tags.length ? (
                                <TableCell align='left'>Vazio</TableCell>
                            ) : (
                                <TableCell align='left' sx={{ gap: 1, display: 'flex' }}>
                                    {row.Tags.map((item) => (
                                        <Chip
                                            size='small'
                                            color='primary'
                                            variant='string'
                                            sx={{ backgroundColor: item.color, border: '1px' }}
                                            label={item.name}>
                                        </Chip>
                                    ))}
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}