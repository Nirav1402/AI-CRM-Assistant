import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { updateField } from "../../redux/slices/interactionSlice";

export default function SentimentSection() {
  const dispatch = useDispatch();

  const formData = useSelector(
    (state) => state.interaction.formData
  );

  const handleChange = (event) => {
    dispatch(
      updateField({
        field: "sentiment",
        value: event.target.value,
      })
    );
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 3 }}>
      <CardContent>

        <Typography variant="h6" mb={2}>
          HCP Sentiment
        </Typography>

        <RadioGroup
          row
          value={formData.sentiment}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Positive"
            control={<Radio />}
            label="Positive"
          />

          <FormControlLabel
            value="Neutral"
            control={<Radio />}
            label="Neutral"
          />

          <FormControlLabel
            value="Negative"
            control={<Radio />}
            label="Negative"
          />
        </RadioGroup>

      </CardContent>
    </Card>
  );
}