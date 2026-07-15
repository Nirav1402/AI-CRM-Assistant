import { Box, TextField, Button } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function ChatInput({ message, setMessage, onSend, loading }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <Box display="flex" gap={1} p={1.5} borderTop="1px solid #dce9eb" bgcolor="#fff">
      <TextField
        fullWidth
        multiline
        maxRows={3}
        size="small"
        placeholder="Describe interaction..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant="contained"
        startIcon={<AutoAwesomeIcon fontSize="small" />}
        onClick={onSend}
        disabled={loading}
        sx={{ bgcolor: "#536174", textTransform: "none", minWidth: 74 }}
      >
        Log
      </Button>
    </Box>
  );
}
