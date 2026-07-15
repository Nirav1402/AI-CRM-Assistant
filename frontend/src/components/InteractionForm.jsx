import { Stack, Button } from "@mui/material";

import BasicDetails from "./BasicDetails";
import DiscussionSection from "./DiscussionSection";
import MaterialsSection from "./MaterialsSection";
import SentimentSection from "./SentimentSection";
import OutcomeSection from "./OutcomeSection";

export default function InteractionForm({ formData, setFormData }) {
  const handleSave = () => {
    console.log(formData);

    // Next step:
    // POST /log-interaction
  };

  return (
    <Stack spacing={3}>
      <BasicDetails
        formData={formData}
        setFormData={setFormData}
      />

      <DiscussionSection
        formData={formData}
        setFormData={setFormData}
      />

      <MaterialsSection
        formData={formData}
        setFormData={setFormData}
      />

      <SentimentSection
        formData={formData}
        setFormData={setFormData}
      />

      <OutcomeSection
        formData={formData}
        setFormData={setFormData}
      />

      <Button
        variant="contained"
        size="large"
        onClick={handleSave}
      >
        Save Interaction
      </Button>
    </Stack>
  );
}