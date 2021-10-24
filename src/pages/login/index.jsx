import { Auth } from '@supabase/ui'
import supabase from '@config/supabase'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import logo from '@assets/images/logo.png'

export default function AuthBasic() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={logo} alt="Logo Calories" height={111} width={156} />
        <Box pt={5} />
        <Auth supabaseClient={supabase} providers={['google', 'facebook']} />
      </Box>
    </Container>
  )
}
