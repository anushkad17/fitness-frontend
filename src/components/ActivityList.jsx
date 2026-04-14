import {
  Card,
  Typography,
  Box,
  Grid
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActivities } from "../services/api";
import ActivityForm from "./ActivityForm";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";


const getIcon = (type) => {
  switch (type?.toLowerCase()) {
    case "running": return "🏃";
    case "walking": return "🚶";
    case "cycling": return "🚴";
    default: return "🔥";
  }
};


const sampleData = [
  { value: 10 },
  { value: 20 },
  { value: 15 },
  { value: 30 },
  { value: 25 },
  { value: 40 },
];

/* STAT CARD */
const StatCard = ({ type, title, value }) => {
  const isCalories = type === "calories";
  const isDuration = type === "duration";
  const isSessions = type === "sessions";

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        display: { xs: "block", md: "flex" },
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#fff",
      }}
    >
      {/* LEFT */}
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          sx={{
            fontSize: 28,
            p: 2,
            borderRadius: "50%",
            background: isCalories
              ? "rgba(239,68,68,0.2)"
              : isDuration
              ? "rgba(59,130,246,0.2)"
              : "rgba(34,197,94,0.2)",
          }}
        >
          {isCalories ? "🔥" : isDuration ? "⏱" : "📊"}
        </Box>

        <Box>
          <Typography sx={{ opacity: 0.7 }}>
            {title}
          </Typography>

          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>
        </Box>
      </Box>

      {/* RIGHT VISUAL */}
      <Box sx={{ width: 120, height: 50 }}>

        {/* LINE CHART */}
        {isCalories && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#fb923c"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {/* CIRCLE */}
        {isDuration && (
          <Box
            sx={{
              width: 45,
              height: 45,
              borderRadius: "50%",
              border: "5px solid rgba(255,255,255,0.2)",
              borderTop: "5px solid #3b82f6",
              animation: "spin 2s linear infinite",
            }}
          />
        )}

        {/* BAR CHART */}
        {isSessions && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleData}>
              <Bar dataKey="value" fill="#9ca3af" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Card>
  );
};

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const res = await getActivities();
      setActivities(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const totalCalories = activities.reduce(
    (sum, a) => sum + (a.caloriesBurned || 0),
    0
  );

  const avgDuration =
    activities.length > 0
      ? Math.round(
          activities.reduce((sum, a) => sum + a.duration, 0) /
            activities.length
        )
      : 0;

  const totalActivities = activities.length;

  return (
    <Box>

      {/*  TOP STATS */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatCard
            type="calories"
            title="Total Calories"
            value={`${totalCalories} kcal`}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard
            type="duration"
            title="Avg Duration"
            value={`${avgDuration} min`}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard
            type="sessions"
            title="Activity Summary"
            value={`${totalActivities} Sessions`}
          />
        </Grid>
      </Grid>

      {/*  MAIN LAYOUT */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          height: "calc(100vh - 220px)",
          width: "100%",
          overflow: "hidden",
        }}
      >

        {/*  LEFT FORM */}
<Box
  sx={{
    width: { xs: "100%", md: "300px" },      
    minWidth: { xs: "100%", md: "300px" },   
    flexShrink: 0,
    position: { xs: "relative", md: "sticky" }, 
    top: 0,
    height: "fit-content",
  }}
>
  <ActivityForm onActivityAdded={fetchActivities} />
</Box>

        {/* RIGHT LIST */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            overflowY: "auto",
            overflowX: "hidden",
            pr: 1,
            "&::-webkit-scrollbar": { display: "none" },
    msOverflowStyle: "none",
    scrollbarWidth: "none",
          }}
        >

          {/*  ACTIVITY GRID */}
          <Grid container spacing={3}>
            {activities.map((a) => {
              console.log(JSON.stringify(a, null, 2)); 

              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                  key={a.id}
                >
                  <Card
                    sx={{
                      p: 2,
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(14px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#fff",
                      cursor: "pointer",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                      },
                    }}
                    onClick={() => navigate(`/activities/${a.id}`)}
                  >
                    <Typography fontWeight="bold" sx={{ mb: 1 }}>
                      {getIcon(a.type)} {a.type?.toUpperCase()}
                    </Typography>

                    <Typography>⏱ {a.duration} min</Typography>
                    <Typography>🔥 {a.caloriesBurned} kcal</Typography>

                    <Typography sx={{ opacity: 0.6, mt: 1, fontSize: 12 }}>
                      {a.createdAt
                        ? new Date(a.createdAt).toLocaleString()
                        : ""}
                    </Typography>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

        </Box>
      </Box>
    </Box>
  );
};

export default ActivityList;