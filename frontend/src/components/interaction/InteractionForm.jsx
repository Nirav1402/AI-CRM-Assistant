import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#fff",
    borderRadius: 1.5,
    pointerEvents: "none",
  },
};

export default function InteractionForm() {
  const formData = useSelector((state) => state.interaction.formData);

  const readOnly = () => undefined;

  const handleSave = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hcp_name: formData.hcpName,
          speciality: "",
          date: formData.date || null,
          time: formData.time || null,
          interaction_type: formData.interactionType,
          attendees: formData.attendees,
          topic: formData.topics,
          products_discussed: formData.topics,
          materials_shared: formData.materials,
          samples_distributed: formData.samples,
          summary: formData.outcome,
          follow_up: formData.followUp,
          sentiment: formData.sentiment,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Unable to save interaction");
      }

      await response.json();
      alert("Interaction saved successfully!");
    } catch (err) {
      console.error(err);
      alert(`Failed to save interaction: ${err.message}`);
    }
  };

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden", bgcolor: "#fff" }}>
      <Box sx={{ px: 2.5, py: 1.7, bgcolor: "#f2fbfc", borderBottom: "1px solid #dce9eb" }}>
        <Typography fontWeight={700}>Interaction Details</Typography>
      </Box>

      <Stack spacing={2.1} sx={{ p: 2.5 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="caption" fontWeight={600}>HCP Name</Typography>
            <TextField fullWidth size="small" placeholder="AI will populate the HCP..." value={formData.hcpName} onChange={readOnly} slotProps={{ htmlInput: { readOnly: true } }} sx={fieldSx} />
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="caption" fontWeight={600}>Interaction Type</Typography>
            <TextField select fullWidth size="small" value={formData.interactionType} onChange={readOnly} sx={fieldSx}>
              {['Meeting', 'Face-to-Face', 'Virtual Meeting', 'Phone Call', 'Email'].map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="caption" fontWeight={600}>Date</Typography>
            <TextField fullWidth size="small" type="date" value={formData.date} onChange={readOnly} slotProps={{ htmlInput: { readOnly: true } }} sx={fieldSx} />
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="caption" fontWeight={600}>Time</Typography>
            <TextField fullWidth size="small" type="time" value={formData.time} onChange={readOnly} slotProps={{ htmlInput: { readOnly: true } }} sx={fieldSx} />
          </Grid>
        </Grid>

        <Box>
          <Typography variant="caption" fontWeight={600}>Attendees</Typography>
          <TextField fullWidth size="small" placeholder="AI will add attendees..." value={formData.attendees} onChange={readOnly} slotProps={{ htmlInput: { readOnly: true } }} sx={fieldSx} />
        </Box>

        <Box>
          <Typography variant="caption" fontWeight={600}>Topics Discussed</Typography>
          <TextField fullWidth multiline minRows={3} placeholder="AI will extract discussion points..." value={formData.topics} onChange={readOnly} slotProps={{ htmlInput: { readOnly: true } }} sx={fieldSx} />
          <Button size="small" startIcon={<MicNoneIcon />} sx={{ mt: .7, color: "#505a6b", bgcolor: "#f3f4f7", textTransform: "none" }}>
            Summarize from Voice Note (Requires Consent)
          </Button>
        </Box>

        <Box>
          <Typography variant="caption" fontWeight={600}>Materials Shared / Samples Distributed</Typography>
          <Stack spacing={1} mt={0.5}>
            <TextField fullWidth size="small" label="Materials Shared" placeholder="No materials added" value={formData.materials} onChange={readOnly} sx={fieldSx}
              slotProps={{ htmlInput: { readOnly: true }, input: { endAdornment: <InputAdornment position="end"><Button size="small" startIcon={<SearchIcon />}>Search/Add</Button></InputAdornment> } }} />
            <TextField fullWidth size="small" label="Samples Distributed" placeholder="No samples added" value={formData.samples} onChange={readOnly} sx={fieldSx}
              slotProps={{ htmlInput: { readOnly: true }, input: { endAdornment: <InputAdornment position="end"><Button size="small" startIcon={<AddCircleIcon />}>Add Sample</Button></InputAdornment> } }} />
          </Stack>
        </Box>

        <Box>
          <Typography variant="caption" fontWeight={600}>Observed/Inferred HCP Sentiment</Typography>
          <RadioGroup row value={formData.sentiment} onChange={readOnly} sx={{ pointerEvents: "none" }}>
            {['Positive', 'Neutral', 'Negative'].map((item) => <FormControlLabel key={item} value={item} control={<Radio size="small" />} label={<Typography variant="body2">{item}</Typography>} />)}
          </RadioGroup>
        </Box>

        <Box>
          <Typography variant="caption" fontWeight={600}>Outcomes</Typography>
          <TextField fullWidth multiline minRows={2} placeholder="AI will extract outcomes..." value={formData.outcome} onChange={readOnly} slotProps={{ htmlInput: { readOnly: true } }} sx={fieldSx} />
        </Box>

        <Box>
          <Typography variant="caption" fontWeight={600}>Follow-up Actions</Typography>
          <TextField fullWidth multiline minRows={2} placeholder="AI will suggest next steps..." value={formData.followUp} onChange={readOnly} slotProps={{ htmlInput: { readOnly: true } }} sx={fieldSx} />
        </Box>

        <Box sx={{ bgcolor: "#f7f9fc", borderRadius: 1.5, p: 1.5 }}>
          <Typography variant="caption" fontWeight={700}>AI Suggested Follow-ups:</Typography>
          <Typography variant="body2" color="primary">• Schedule follow-up meeting in 2 weeks</Typography>
          <Typography variant="body2" color="primary">• Send educational materials to HCP</Typography>
          <Typography variant="body2" color="primary">• Add HCP to relevant advisory board invite list</Typography>
        </Box>

        <Divider />
        <Button variant="contained" onClick={handleSave} sx={{ alignSelf: "flex-end", textTransform: "none", px: 3 }}>Save Interaction</Button>
      </Stack>
    </Paper>
  );
}
