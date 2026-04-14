import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getActivityDetail, getActivityById } from '../services/api';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

const ActivityDetail = () => {

  const { id } = useParams();

  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
  let interval;

  const fetchActivityDetail = async () => {
    try {
      const response = await getActivityDetail(id);
      const data = response.data;

      // set activity
      if (data.activity) {
        setActivity(data.activity);
      } else {
        const activityRes = await getActivityById(id);
        setActivity(activityRes.data);
      }

      setRecommendation(data);

      console.log("API RESPONSE:", data);

      // STOP ONLY when REAL recommendation comes
      if (
        data.recommendation &&
        data.recommendation !== "Recommendation is being generated..."
      ) {
        clearInterval(interval);
      }

    } catch (error) {
      console.error(error);
    }
  };

  fetchActivityDetail();

  interval = setInterval(fetchActivityDetail, 2000); // faster polling

  return () => clearInterval(interval);

}, [id]);

  if (!activity) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>

      {/* Activity Details */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Activity Details</Typography>

          <Typography>Type: {activity?.type || 'N/A'}</Typography>
          <Typography>Duration: {activity?.duration || 0} minutes</Typography>
          <Typography>Calories Burned: {activity?.caloriesBurned || 0}</Typography>
          <Typography>
            Date: {activity?.createdAt
              ? new Date(activity.createdAt).toLocaleString()
              : 'N/A'}
          </Typography>

        </CardContent>
      </Card>

      {/* AI Recommendation */}
      {recommendation && (
        <Card>
          <CardContent>

            <Typography variant="h5" gutterBottom>AI Recommendation</Typography>

            {/* Analysis */}
            <Typography variant="h6">Analysis</Typography>
            <Typography sx={{ mb: 2 }}>
              {recommendation.recommendation &&
 recommendation.recommendation !== "Recommendation is being generated..."
  ? recommendation.recommendation
  : " AI is generating your recommendation..."}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Improvements */}
            <Typography variant="h6">Improvements</Typography>
            {recommendation?.improvements?.length > 0 ? (
              recommendation.improvements.map((item, index) => (
                <Typography key={index} sx={{ mb: 1 }}>
                  • {item}
                </Typography>
              ))
            ) : (
              <Typography sx={{ mb: 1 }}>No improvements available</Typography>
            )}

            <Divider sx={{ my: 2 }} />

            {/* Suggestions */}
            <Typography variant="h6">Suggestions</Typography>
            {recommendation?.suggestions?.length > 0 ? (
              recommendation.suggestions.map((item, index) => (
                <Typography key={index} sx={{ mb: 1 }}>
                  • {item}
                </Typography>
              ))
            ) : (
              <Typography sx={{ mb: 1 }}>No suggestions available</Typography>
            )}

            <Divider sx={{ my: 2 }} />

            {/* Safety */}
            <Typography variant="h6">Safety Guidelines</Typography>
            {recommendation?.safety?.length > 0 ? (
              recommendation.safety.map((item, index) => (
                <Typography key={index} sx={{ mb: 1 }}>
                  • {item}
                </Typography>
              ))
            ) : (
              <Typography sx={{ mb: 1 }}>No safety guidelines available</Typography>
            )}

          </CardContent>
        </Card>
      )}

    </Box>
  )
}

export default ActivityDetail