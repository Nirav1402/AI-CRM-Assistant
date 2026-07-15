import { Box, Paper, Typography } from "@mui/material";

export default function ChatMessage({ sender, text }) {
  const isUser = sender === "user";

  return (
    <Box display="flex" justifyContent={isUser ? "flex-end" : "flex-start"} mb={1.5}>
      <Paper
        variant="outlined"
        sx={{
          p: 1.5,
          maxWidth: "88%",
          borderRadius: 1.5,
          bgcolor: isUser ? "#1976d2" : "#fff",
          color: isUser ? "white" : "#273142",
        }}
      >
        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{text}</Typography>
      </Paper>
    </Box>
  );
}
