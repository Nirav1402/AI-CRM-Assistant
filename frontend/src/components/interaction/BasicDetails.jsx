import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { updateField } from "../../redux/slices/interactionSlice";

const interactionTypes = [
  "Face-to-Face",
  "Virtual Meeting",
  "Phone Call",
  "Email",
];

export default function BasicDetails() {

  const dispatch = useDispatch();

  const formData = useSelector(
    (state) => state.interaction.formData
  );

  const handleChange = (field) => (event) => {
    dispatch(
      updateField({
        field,
        value: event.target.value,
      })
    );
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 3 }}>
      <CardContent>

        <Typography variant="h6" mb={2}>
          Interaction Details
        </Typography>

        <Grid container spacing={2}>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="HCP Name"
              value={formData.hcpName}
              onChange={handleChange("hcpName")}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleChange("date")}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              type="time"
              label="Time"
              InputLabelProps={{ shrink: true }}
              value={formData.time}
              onChange={handleChange("time")}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              select
              fullWidth
              label="Interaction Type"
              value={formData.interactionType}
              onChange={handleChange("interactionType")}
            >
              {interactionTypes.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

        </Grid>

      </CardContent>
    </Card>
  );
}