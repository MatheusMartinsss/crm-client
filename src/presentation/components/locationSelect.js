import { Autocomplete, TextField, Grid } from "@mui/material"
import Api from "../../helpers/api"
import { useEffect, useState } from "react"

const LocationSelect = ({ handleLocation, initialValue }) => {
    const [estados, setEstados] = useState([])
    const [cidades, setCidades] = useState([])
    const [location, setLocation] = useState({
        estado: {
            nome: '' || initialValue?.estado,
            sigla: '' || initialValue?.uf
        },
        cidade: '' || initialValue?.cidade
    })

    const fetchStates = async () => {
        const response = await Api.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        setEstados(response.data)
    }
    const fetchCitys = async () => {
        const response = await Api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${location?.estado?.sigla}/municipios`)
        setCidades(response.data)
    }
    useEffect(() => {
        setCidades([])

        // eslint-disable-next-line
    }, [location.estado])
    useEffect(() => {
        handleLocation(location)
        // eslint-disable-next-line
    }, [location])
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Autocomplete
                    options={estados}
                    value={location.estado || null}
                    getOptionLabel={(option) => option.nome || ''}
                    isOptionEqualToValue={(option, value) => option.sigla === value.sigla}
                    onChange={(_, newValue) => {
                        setLocation((state) => ({ ...state, estado: newValue, cidade: '' }))
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            onClick={fetchStates}
                            label="Estados"
                            autoComplete='new-password'
                            InputProps={{
                                ...params.InputProps,
                            }}
                        />
                    )}
                >
                </Autocomplete>
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                    options={cidades}
                    disabled={!location.estado}
                    value={location.cidade}
                    getOptionLabel={(option) => option.nome || option}
                    isOptionEqualToValue={(option, value) => option.nome === value}
                    onChange={(_, newValue) => {
                        setLocation((state) => ({ ...state, cidade: newValue.nome }))
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            onClick={fetchCitys}
                            label="Cidades"
                            autoComplete='new-password'
                            InputProps={{
                                ...params.InputProps,
                            }}
                        />
                    )}
                >
                </Autocomplete>
            </Grid>
        </Grid>
    )
}

export default LocationSelect