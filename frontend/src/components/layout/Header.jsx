import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 3 },
        pt: 2.5,
        pb: 1.5,
      }}
    >
      <Typography variant="h5" fontWeight={700} color="#172033">
        Log HCP Interaction
      </Typography>
    </Box>
  );
}
