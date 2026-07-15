import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header";
import InteractionForm from "../interaction/InteractionForm";
import ChatPanel from "../chat/ChatPanel";

import { setFormData } from "../../redux/slices/interactionSlice";

export default function MainLayout() {
  const dispatch = useDispatch();

  const formData = useSelector(
    (state) => state.interaction.formData
  );

  const updateFormData = (data) => {
    dispatch(setFormData(typeof data === "function" ? data(formData) : data));
  };

  return (
    <Box
      sx={{
        bgcolor: "#f7f7fb",
        minHeight: "100vh",
        maxWidth: 1440,
        mx: "auto",
      }}
    >
      <Header />

      <Grid
        container
        spacing={2.5}
        sx={{ px: { xs: 2, md: 3 }, pb: 3 }}
      >
        <Grid size={{ xs: 12, md: 8.2 }}>
          <InteractionForm
            formData={formData}
            setFormData={updateFormData}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3.8 }}>
          <ChatPanel
            setFormData={updateFormData}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
