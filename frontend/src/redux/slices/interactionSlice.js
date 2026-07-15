import { createSlice } from "@reduxjs/toolkit";

const now = new Date();
const today = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0"),
].join("-");

const initialState = {
  formData: {
    hcpName: "",
    accountName: "",
    date: today,
    time: "",
    interactionType: "Meeting",
    attendees: "",
    topics: "",
    materials: "",
    samples: "",
    sentiment: "Neutral",
    outcome: "",
    followUp: "",
    summary: "",
  },
};

const interactionSlice = createSlice({
  name: "interaction",

  initialState,

  reducers: {
    setFormData(state, action) {
      state.formData = action.payload;
    },

    updateField(state, action) {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },

    resetForm(state) {
      state.formData = initialState.formData;
    },
  },
});

export const {
  setFormData,
  updateField,
  resetForm,
} = interactionSlice.actions;

export default interactionSlice.reducer;
