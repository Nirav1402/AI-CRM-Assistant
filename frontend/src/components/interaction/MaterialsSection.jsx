import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { updateField } from "../../redux/slices/interactionSlice";

export default function MaterialsSection() {
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
          Materials & Samples
        </Typography>

        <Grid container spacing={2}>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Materials Shared"
              placeholder="Brochure, Clinical Study, Leave Behind..."
              value={formData.materials}
              onChange={handleChange("materials")}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Samples Distributed"
              placeholder="e.g. Jardiance Starter Kit"
              value={formData.samples}
              onChange={handleChange("samples")}
            />
          </Grid>

        </Grid>

      </CardContent>
    </Card>
  );
}