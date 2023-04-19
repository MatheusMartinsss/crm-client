import BookmarksIcon from '@mui/icons-material/Bookmarks';
import GroupsIcon from '@mui/icons-material/Groups';
import GridViewIcon from '@mui/icons-material/GridView';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
export const menuItens = [
    {
        label: 'Negociacoes',
        path: '/',
        icon: <BookmarksIcon />
    }, {
        label: 'Clientes',
        path: '/clientes',
        icon: <GroupsIcon />
    }, {
        label: 'Grupos',
        path: '/grupos',
        icon: <GridViewIcon />
    }, {
        label: 'Usuarios',
        path: '/users',
        icon: <ManageAccountsIcon />
    }
]