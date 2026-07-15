import {
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { updateField } from "../../redux/slices/interactionSlice";

export default function DiscussionSection() {

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
          Discussion
        </Typography>

        <TextField
          fullWidth
          label="Attendees"
          sx={{ mb: 2 }}
          value={formData.attendees}
          onChange={handleChange("attendees")}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Topics Discussed"
          value={formData.topics}
          onChange={handleChange("topics")}
        />

      </CardContent>
    </Card>
  );
}