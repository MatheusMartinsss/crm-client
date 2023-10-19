import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { GroupsList } from '../../components/groups-list/groups-list'
import { GroupModal } from '../../components/group-form/group-modal'
import Layout from '../../components/layout/layout'
import { FilterBox } from '../../components/custom-styles/custom-styles'

export const GroupsView = () => {
    const [open, setOpen] = useState(false)

    const handleModal = () => setOpen((state) => !state)
    return (
        <Layout>
            <Box display='flex' justifyContent='center' flexDirection='column' width='100%'  gap={1}>
                <FilterBox>
                    <Box>
                        <Button size='small' onClick={handleModal} variant='contained' color='primary'>nova Etapa</Button>
                    </Box>
                </FilterBox>

                <GroupsList />
                <GroupModal open={open} handleModal={handleModal} />
            </Box>
        </Layout>
    )
}

