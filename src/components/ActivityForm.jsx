import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux"; // ✅ Added for Redux access
import { addActivity } from "../services/api";

const ActivityForm = ({ onActivityAdded }) => {
  // ✅ Get the userId from your Redux auth state
  const { userId } = useSelector((state) => state.auth);

  const [type, setType] = useState("Running");
  const [customType, setCustomType] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");

  const formatDate = () => {
    const d = new Date();
    // Returns "YYYY-MM-DDTHH:mm:ss" format
    return d.toISOString().slice(0, 19);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalType =
      type === "Other"
        ? customType.toUpperCase()
        : type.toUpperCase();

    // Validation
    if (
      !finalType?.trim() ||
      !duration ||
      isNaN(duration) ||
      parseInt(duration) <= 0 ||
      !caloriesBurned ||
      isNaN(caloriesBurned) ||
      parseInt(caloriesBurned) <= 0
    ) {
      alert("Enter valid values (greater than 0)");
      return;
    }

    // Safety check for userId
    if (!userId) {
      alert("User session expired. Please log in again.");
      return;
    }

    try {
      // ✅ Payload now includes the userId string and matches backend expectations
      const payload = {
        userId: userId, // Pass the sub/id string
        type: finalType,
        duration: parseInt(duration),
        caloriesBurned: parseInt(caloriesBurned),
        startTime: formatDate(),
        // If your Java backend uses a String for this field, change {} to ""
        additionalMetrics: "", 
      };

      await addActivity(payload);

      // Reset form
      setType("Running");
      setCustomType("");
      setDuration("");
      setCaloriesBurned("");

      // Refresh list
      onActivityAdded();

    } catch (error) {
      // This will log the specific field that failed validation from the backend
      console.error("ERROR DETAILS:", error.response?.data || error.message);
      alert("Failed to add activity. Check console for details.");
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 4,
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#fff",
      }}
    >
      <Typography variant="h6" mb={2} fontWeight="bold">
        Add New Activity
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* ACTIVITY TYPE */}
        <TextField
          select
          fullWidth
          label="Activity Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          sx={inputStyle}
        >
          <MenuItem value="Running">🏃 Running</MenuItem>
          <MenuItem value="Walking">🚶 Walking</MenuItem>
          <MenuItem value="Cycling">🚴 Cycling</MenuItem>
          <MenuItem value="Other">➕ Other</MenuItem>
        </TextField>

        {/* CUSTOM INPUT */}
        {type === "Other" && (
          <TextField
            fullWidth
            label="Enter Custom Activity"
            value={customType}
            onChange={(e) => setCustomType(e.target.value)}
            sx={inputStyle}
          />
        )}

        {/* DURATION */}
        <TextField
          fullWidth
          type="number"
          label="Duration (Minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          sx={inputStyle}
        />

        {/* CALORIES */}
        <TextField
          fullWidth
          type="number"
          label="Calories Burned"
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(e.target.value)}
          sx={inputStyle}
        />

        {/* BUTTON */}
        <Button
          fullWidth
          type="submit"
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: 3,
            fontWeight: "bold",
            background: "#ef4444",
            color: "#fff",
            "&:hover": {
              background: "#dc2626",
              transform: "scale(1.02)"
            },
            transition: "0.2s"
          }}
        >
          ADD ACTIVITY 
        </Button>
      </form>
    </Box>
  );
};

const inputStyle = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.2)",
    },
    "&:hover fieldset": {
      borderColor: "#ef4444",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ef4444",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.7)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#ef4444",
  },
};

export default ActivityForm;