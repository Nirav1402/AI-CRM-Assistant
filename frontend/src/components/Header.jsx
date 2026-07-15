import { Typography, Box } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        bgcolor: "white",
        px: 4,
        py: 2,
        borderBottom: "1px solid #ddd",
      }}
    >
      <Typography variant="h4" fontWeight={700}>
        Log HCP Interaction
      </Typography>
    </Box>
  );
}