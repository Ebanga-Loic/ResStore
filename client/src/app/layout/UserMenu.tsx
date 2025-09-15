import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Person, Logout, History } from '@mui/icons-material';
import { ListItemIcon, ListItemText, Divider, Fade } from '@mui/material';
import { useLogoutMutation } from '../../features/account/accountApi';
import { User } from '../models/user';
import NoSsr from '@mui/material/NoSsr';

type Props = { user: User };

export default function UserMenu({ user }: Props) {
  const [logout] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // ✅ container “safe” (ne dépend pas du render SSR)
  const container = React.useMemo<HTMLElement | undefined>(() => {
    if (typeof document !== 'undefined' && document?.body) return document.body;
    return undefined;
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

 /* const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      handleClose();
    } catch {
      handleClose();
    }
  };*/

  return (
    // ✅ évite tout rendu SSR pour le Menu/Modal
    <NoSsr defer>
      <div>
        <Button
          id="user-menu-button"
          onClick={handleClick}
          color='inherit'
          size='large'
          sx={{fontSize: '1.1rem'}}
          aria-controls={open ? 'user-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          {user.email}
        </Button>

        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
          // ✅ 1) évite le calcul de scrollbar qui plante
          disableScrollLock
          // ✅ 2) garde le contenu monté (réduit les re-mount bizarres)
          keepMounted
          // ✅ 3) force explicitement le container (si dispo)
          container={container}
          MenuListProps={{ 'aria-labelledby': 'user-menu-button' }}
        >
          <MenuItem>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText>My profile</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <History />
            </ListItemIcon>
            <ListItemText>My orders</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    </NoSsr>
  );
}
