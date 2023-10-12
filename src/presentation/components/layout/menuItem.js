import { Box, ButtonBase } from "@mui/material";
import { common } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export const MenuItem = ({ Icon, label, path, active, open }) => {
    const navigate = useNavigate()
    return (
        <li>
            <ButtonBase
                onClick={() => navigate(path)}
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    pl: '16px',
                    pr: '16px',
                    py: '6px',
                    textAlign: 'left',
                    width: '100%',
                    ...(active && {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }),
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }
                }}
            >
                {Icon && open ?
                    <>
                        <Box
                            component="span"
                            sx={{
                                alignItems: 'center',
                                color: common.white,
                                display: 'inline-flex',
                                justifyContent: 'center',
                                mr: 2,
                                ...(active && {
                                    color: 'primary.main'
                                })
                            }}
                        >
                            {Icon}
                        </Box>
                        <Box
                            component="span"
                            sx={{
                                flexGrow: 1,
                                fontSize: 14,
                                fontWeight: 600,
                                lineHeight: '24px',
                                color: common.white,
                                whiteSpace: 'nowrap',
                                ...(active && {
                                    color: 'primary.main'
                                }),

                            }}
                        >
                            {label}
                        </Box>
                    </> :
                    <>
                        <Box
                            component="span"
                            sx={{
                                alignItems: 'center',
                                color: common.white,
                                display: 'inline-flex',
                                justifyContent: 'center',
                                mr: 2,
                                ...(active && {
                                    color: 'primary.main'
                                })
                            }}
                        >
                            {Icon}
                        </Box>
                    </>
                }

            </ButtonBase>
        </li>
    )
}