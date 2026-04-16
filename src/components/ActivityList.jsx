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
display: "flex",
flexDirection: { xs: "column", md: "row" },
alignItems: "center",
justifyContent: "space-between",
background: "rgba(255,255,255,0.05)",
backdropFilter: "blur(20px)",
border: "1px solid rgba(255,255,255,0.1)",
color: "#fff",
}}
> <Box display="flex" alignItems="center" gap={2}>
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
{isCalories ? "🔥" : isDuration ? "⏱" : "📊"} </Box>

```
    <Box>
      <Typography sx={{ opacity: 0.7 }}>
        {title}
      </Typography>

      <Typography variant="h5" fontWeight="bold">
        {value}
      </Typography>
    </Box>
  </Box>

  <Box sx={{ width: 120, height: 100 }}>
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

    {isSessions && (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sampleData}>
          <Bar dataKey="value" fill="#9ca3af" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )}
  </Box>
</Card>
```

);
};

const ActivityList = () => {
const [activities, setActivities] = useState([]);
const navigate = useNavigate();

const fetchActivities = async () => {
try {
const res = await getActivities();

```
  console.log("API RESPONSE:", res.data); // 🔍 DEBUG

  // ✅ SAFE EXTRACTION
  const data = Array.isArray(res.data)
    ? res.data
    : res.data?.content || res.data?.data || [];

  setActivities(data);
} catch (err) {
  console.error("FETCH ERROR:", err);
  setActivities([]); // fallback
}
```

};

useEffect(() => {
fetchActivities();
}, []);

// ✅ ALWAYS SAFE ARRAY
const safeActivities = Array.isArray(activities) ? activities : [];

const totalCalories = safeActivities.reduce(
(sum, a) => sum + (a.caloriesBurned || 0),
0
);

const avgDuration =
safeActivities.length > 0
? Math.round(
safeActivities.reduce((sum, a) => sum + (a.duration || 0), 0) /
safeActivities.length
)
: 0;

const totalActivities = safeActivities.length;

return ( <Box>
<Grid container spacing={3} sx={{ mb: 4 }}> <Grid item xs={12} md={4}>
<StatCard
type="calories"
title="Total Calories"
value={`${totalCalories} kcal`}
/> </Grid>

```
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

  <Box sx={{ display: "flex", gap: 3 }}>
    <Box sx={{ width: 300 }}>
      <ActivityForm onActivityAdded={fetchActivities} />
    </Box>

    <Box sx={{ flex: 1, overflowY: "auto" }}>
      <Grid container spacing={3}>
        {safeActivities.map((a) => (
          <Grid item xs={12} sm={6} md={4} key={a.id}>
            <Card
              sx={{
                p: 2,
                borderRadius: 4,
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/activities/${a.id}`)}
            >
              <Typography fontWeight="bold">
                {getIcon(a.type)} {a.type?.toUpperCase()}
              </Typography>

              <Typography>⏱ {a.duration} min</Typography>
              <Typography>🔥 {a.caloriesBurned} kcal</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
</Box>
```

);
};

export default ActivityList;
