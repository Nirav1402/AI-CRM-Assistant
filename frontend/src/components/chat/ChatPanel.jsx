import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Paper,
  Typography,
  Box,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

import { sendMessage } from "../../services/api";

import {
  addMessage,
  setLoading,
} from "../../redux/slices/chatSlice";

export default function ChatPanel({ setFormData }) {

  const dispatch = useDispatch();

  const messages = useSelector(
    (state) => state.chat.messages
  );

  const loading = useSelector(
    (state) => state.chat.loading
  );

  const formData = useSelector(
    (state) => state.interaction.formData
  );

  const [message, setMessage] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
const handleSend = async () => {
  if (!message.trim()) return;

  const userMessage = message;

  dispatch(
    addMessage({
      sender: "user",
      text: userMessage,
    })
  );

  setMessage("");
  dispatch(setLoading(true));

  try {
    const res = await sendMessage(userMessage, formData, [
      ...messages,
      { sender: "user", text: userMessage },
    ]);

    dispatch(
      addMessage({
        sender: "ai",
        text: res.ai_summary,
      })
    );

    const tool = res.tool;
    const crm = res.structured_data;

    // -----------------------------
    // TOOL 1 - Log Interaction
    // -----------------------------
    if (tool === "log_interaction") {
      setFormData((previous) => ({
        ...previous,
        hcpName: crm.hcp_name || "",
        date: crm.date || previous.date,
        time: crm.time || "",
        interactionType: crm.interaction_type || "",
        attendees: crm.attendees || "",
        topics: Array.isArray(crm.products_discussed)
          ? crm.products_discussed.join(", ")
          : "",
        materials: Array.isArray(crm.materials_shared)
          ? crm.materials_shared.join(", ")
          : "",
        samples: Array.isArray(crm.samples_distributed)
          ? crm.samples_distributed.join(", ")
          : "",
        sentiment: crm.sentiment || "Neutral",
        outcome: crm.summary || "",
        followUp: crm.follow_up || "",
      }));
    }

    // -----------------------------
    // TOOL 2 - Edit Interaction
    // -----------------------------
    if (tool === "edit_interaction") {
      setFormData((prev) => ({
        ...prev,

        ...(crm.hcp_name && {
          hcpName: crm.hcp_name,
        }),

        ...(crm.date && {
          date: crm.date,
        }),

        ...(crm.time && {
          time: crm.time,
        }),

        ...(crm.interaction_type && {
          interactionType: crm.interaction_type,
        }),

        ...(crm.attendees && {
          attendees: crm.attendees,
        }),

        ...(crm.products_discussed && {
          topics: Array.isArray(crm.products_discussed)
            ? crm.products_discussed.join(", ")
            : crm.products_discussed,
        }),

        ...(crm.materials_shared && {
          materials: Array.isArray(crm.materials_shared)
            ? crm.materials_shared.join(", ")
            : crm.materials_shared,
        }),

        ...(crm.samples_distributed && {
          samples: Array.isArray(crm.samples_distributed)
            ? crm.samples_distributed.join(", ")
            : crm.samples_distributed,
        }),

        ...(crm.sentiment && {
          sentiment: crm.sentiment,
        }),

        ...(crm.summary && {
          outcome: crm.summary,
        }),

        ...(crm.follow_up && {
          followUp: crm.follow_up,
        }),
      }));
    }

    // -----------------------------
    // TOOL 3
    // Summary
    // -----------------------------
    if (tool === "generate_summary") {
      // AI message already added above
    }

    // -----------------------------
    // TOOL 4
    // Follow-up
    // -----------------------------
    if (tool === "recommend_followup") {
      // AI message already added above
    }

    // -----------------------------
    // TOOL 5
    // Validation
    // -----------------------------
    if (tool === "validate_interaction") {
      // AI asks user for missing information
    }

    // -----------------------------
    // Normal Conversation
    // -----------------------------
    if (tool === "conversation") {
      // Chat only
    }

  } catch (err) {
    dispatch(
      addMessage({
        sender: "ai",
        text:
          "❌ " +
          (err.message || "Backend connection failed"),
      })
    );
  } finally {
    dispatch(setLoading(false));
  }
};
  return (
    <Paper
      variant="outlined"
      sx={{
        height: { xs: 620, md: "calc(100vh - 92px)" },
        minHeight: 620,
        position: { md: "sticky" },
        top: 16,
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "#f2fbfc",
      }}
    >

      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: "1px solid #dce9eb",
          bgcolor: "#f7ffff",
        }}
      >
        <Typography fontWeight={700} color="#172033" display="flex" alignItems="center" gap={1}>
          <AutoAwesomeIcon color="primary" fontSize="small" /> AI Assistant
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Log interaction via chat
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          bgcolor: "#f2fbfc",
        }}
      >
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            sender={msg.sender}
            text={msg.text}
          />
        ))}

        <div ref={bottomRef} />
      </Box>

      <ChatInput
        message={message}
        setMessage={setMessage}
        onSend={handleSend}
        loading={loading}
      />

    </Paper>
  );
}
