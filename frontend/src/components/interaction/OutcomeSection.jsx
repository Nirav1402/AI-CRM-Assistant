import {
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { updateField } from "../../redux/slices/interactionSlice";

export default function OutcomeSection() {
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
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>

        <Typography variant="h6" mb={2}>
          Outcome & Follow-up
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Outcome"
          sx={{ mb: 3 }}
          value={formData.outcome}
          onChange={handleChange("outcome")}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Follow-up Actions"
          value={formData.followUp}
          onChange={handleChange("followUp")}
        />

      </CardContent>
    </Card>
  );
}