import * as React from 'react';
import "../style/navbar.css";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthStore } from "../store/authStore";
import {Stack,Typography,AppBar,Toolbar, Button} from "../utils/myMaterial";

function Navbar() {
  const { user, logout } = useAuthStore();
 const handleLogout = () =>{
    logout()

 }
  return (
      <Stack direction="row" alignItems="center" spacing={2}  >
            <Typography variant="h6">NoteExpenze</Typography>
          </Stack>
   
  );
}
export default Navbar;
