import React, { useEffect, useState } from "react"
import { remoteGetNegociacoesUseCase, remoteFetchNegociacaoUseCase } from '../../../domain/useCases/remote-negociacoes-useCase'
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Chip, TableContainer, IconButton, Fab } from '@mui/material'
import { useNegociacao } from "../../../domain/context/useNegociacao"
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NegociacaoModal } from '../../components/negociacao-form/negociacao-modal'
export default function NegociacoesTable() {
    const { getNegociacoes, setNegociacoes } = useNegociacao()
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const [negociacao, setNegociacao] = useState(null)
    useEffect(() => {
        const fetchNegociacoes = async () => {
            await remoteGetNegociacoesUseCase()
                .then((response) => {
                    setNegociacoes(response)
                }).catch((error) => {
                    setError(error)
                })
        }
        fetchNegociacoes()
        // eslint-disable-next-line 
    }, [])

    const fetchNegociacao = async (id) => {
        await remoteFetchNegociacaoUseCase(id)
            .then((response) => {
                setNegociacao(response)
            }).finally(() => {
                handleModal()
            })
    }

    const handleModal = () => setOpen((state) => !state)

    return (
        <React.Fragment>

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
                            <TableCell align="left">Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getNegociacoes().map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="left">{row?.Group?.name}</TableCell>
                                <TableCell align="left">{row?.name}</TableCell>
                                <TableCell align="left">{row?.Vendedor?.name}</TableCell>
                                <TableCell align="left">{row?.Cliente?.name} {row?.Cliente?.lastname}</TableCell>
                                <TableCell align="left">{row.closeExpect || 'vazio'}</TableCell>
                                {!row.Tags?.length ? (
                                    <TableCell align='left'>Vazio</TableCell>
                                ) : (
                                    <TableCell align='left' >
                                        {row.Tags.map((item) => (
                                            <Chip
                                                key={item.id}
                                                size='small'
                                                color='primary'
                                                variant='string'
                                                sx={{ backgroundColor: item.color, border: '1px' }}
                                                label={item.name}>
                                            </Chip>
                                        ))}
                                    </TableCell>
                                )}
                                <TableCell align="left">
                                    <IconButton onClick={() => fetchNegociacao(row.id)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <NegociacaoModal data={negociacao} handleModal={handleModal} open={open} />
            <Fab onClick={handleModal} variant="extended" size="small" sx={{ width: 300 }} color="primary" aria-label="add">
                Nova negociação
            </Fab>
        </React.Fragment>
    );
}