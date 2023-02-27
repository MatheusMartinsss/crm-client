import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Box, InputBase, Autocomplete, autocompleteClasses, ButtonBase, ClickAwayListener, Popper } from '@mui/material'
import { remoteListTagsUseCase } from '../../domain/useCases/remote-tags-useCase';
import { Tag } from './tag';
const StyledAutocompletePopper = styled('div')(({ theme }) => ({
    [`& .${autocompleteClasses.paper}`]: {
        boxShadow: 'none',
        margin: 0,
        color: 'inherit',
        fontSize: 13,
    },
    [`& .${autocompleteClasses.listbox}`]: {
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
        padding: 0,
        [`& .${autocompleteClasses.option}`]: {
            minHeight: 'auto',
            alignItems: 'flex-start',
            padding: 8,
            borderBottom: `1px solid  ${theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'
                }`,
            '&[aria-selected="true"]': {
                backgroundColor: 'transparent',
            },
            [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
            {
                backgroundColor: theme.palette.action.hover,
            },
        },
    },
    [`&.${autocompleteClasses.popperDisablePortal}`]: {
        position: 'relative',
    },
}));

function PopperComponent(props) {
    const { disablePortal, anchorEl, open, ...other } = props;
    return <StyledAutocompletePopper {...other} />;
}

PopperComponent.propTypes = {
    anchorEl: PropTypes.any,
    disablePortal: PropTypes.bool,
    open: PropTypes.bool.isRequired,
};

const StyledPopper = styled(Popper)(({ theme }) => ({
    border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
    boxShadow: `0 8px 24px ${theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'
        }`,
    borderRadius: 6,
    width: 300,
    zIndex: theme.zIndex.modal,
    fontSize: 13,
    color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    padding: 10,
    width: '100%',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
        }`,
    '& input': {
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
        padding: 8,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        border: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
        fontSize: 14,
        '&:focus': {
            boxShadow: `0px 0px 0px 3px ${theme.palette.mode === 'light'
                ? 'rgba(3, 102, 214, 0.3)'
                : 'rgb(12, 45, 107)'
                }`,
            borderColor: theme.palette.mode === 'light' ? '#0366d6' : '#388bfd',
        },
    },
}));

const Button = styled(ButtonBase)(({ theme }) => ({
    fontSize: 13,
    width: '100%',
    textAlign: 'left',
    paddingBottom: 8,
    color: theme.palette.mode === 'light' ? '#586069' : '#8b949e',
    fontWeight: 600,
    '&:hover,&:focus': {
        color: theme.palette.mode === 'light' ? '#0366d6' : '#58a6ff',
    },
    '& span': {
        width: '100%',
    },
    '& svg': {
        width: 16,
        height: 16,
    },
}));

export default function AutoCompleteTagsAdd({ handleTag, initialValue }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = React.useState(initialValue || []);
    const [pendingValue, setPendingValue] = React.useState([]);
    const [options, setOptions] = React.useState([])
    const theme = useTheme();

    React.useEffect(() => {
        handleTag(value)
        // eslint-disable-next-line
    }, [value])
    const handleClick = async (event) => {
        setPendingValue([])
        setAnchorEl(event.currentTarget);
        if (!options.length) {
            await remoteListTagsUseCase()
                .then((response) => {
                    setOptions(response)
                })
        }
    };
    const handleClose = () => {
        if (pendingValue.length) {
            setValue(pendingValue);
        }
        if (anchorEl) {
            anchorEl.focus();
        }
        setAnchorEl(null);
    };

    const removeTag = (id) => {
        const newValue = value.filter((tag) => tag.id !== id)
        setValue(newValue)
    }
    const open = Boolean(anchorEl);
    const id = open ? 'github-label' : undefined;

    return (
        <React.Fragment>
            <Box flexGrow={1}>
                <Button disableRipple aria-describedby={id} onClick={handleClick}>
                    <span>+ Tags</span>
                    <SettingsIcon />
                </Button>
                <Box display='flex' flexDirection='row' gap={0.5} >
                    {value.map((label) => (
                        <Tag
                            label={label.name}
                            color={label.color}
                            handleRemove={() => removeTag(label.id)}
                        />

                    ))}
                </Box>
            </Box>
            <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
                <ClickAwayListener onClickAway={handleClose}>
                    <div>
                        <Box
                            sx={{
                                borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
                                    }`,
                                padding: '8px 10px',
                                fontWeight: 600,
                            }}
                        >
                            Adicionar Tags
                        </Box>
                        <Autocomplete
                            open
                            multiple
                            onClose={(event, reason) => {
                                if (reason === 'escape') {
                                    handleClose();
                                }
                            }}
                            value={pendingValue}
                            onChange={(event, newValue, reason) => {
                                if (
                                    event.type === 'keydown' &&
                                    event.key === 'Backspace' &&
                                    reason === 'removeOption'
                                ) {
                                    return;
                                }
                                setPendingValue(newValue);
                            }}
                            disableCloseOnSelect
                            PopperComponent={PopperComponent}
                            renderTags={() => null}
                            noOptionsText="No labels"
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Box component={DoneIcon} sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }} style={{ visibility: selected ? 'visible' : 'hidden' }} />
                                    <Box component="span"
                                        sx={{
                                            width: 14,
                                            height: 14,
                                            flexShrink: 0,
                                            borderRadius: '3px',
                                            mr: 1,
                                            mt: '2px',
                                        }}
                                        style={{ backgroundColor: option.color }}
                                    />
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                            '& span': {
                                                color:
                                                    theme.palette.mode === 'light' ? '#586069' : '#8b949e',
                                            },
                                        }}
                                    >
                                        {option.name}
                                        <br />
                                    </Box>
                                    <Box component={CloseIcon} sx={{ opacity: 0.6, width: 18, height: 18 }} style={{ visibility: selected ? 'visible' : 'hidden' }} />
                                </li>
                            )}
                            options={options}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <StyledInput
                                    ref={params.InputProps.ref}
                                    inputProps={params.inputProps}
                                    autoFocus
                                    placeholder="Tags"
                                />
                            )}
                        />
                    </div>
                </ClickAwayListener>
            </StyledPopper>
        </React.Fragment>
    );
}

