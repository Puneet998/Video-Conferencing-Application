import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        console.log("History data:", history);
        // 🧠 Safely handle all possible return types
        if (Array.isArray(history)) {
          setMeetings(history);
        } else if (Array.isArray(history?.data)) {
          setMeetings(history.data);
        } else {
          setMeetings([]); // fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        setMeetings([]); // handle error by resetting
      }
    };
    fetchHistory();
  }, [getHistoryOfUser]);
  // 📅 Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <div style={{ padding: '20px' }}>
      {/* 🏠 Home Button */}
      <IconButton
        onClick={() => routeTo("/home")}
        style={{ marginBottom: '20px' }}
      >
        <HomeIcon />
      </IconButton>
      {/* 🗂️ Meeting History Cards */}
      {Array.isArray(meetings) && meetings.length > 0 ? (
        meetings.map((e, i) => (
          <Card
            key={i}
            variant="outlined"
            sx={{
              mb: 2,
              padding: 2,
              borderRadius: 3,
              boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Code: {e.meetingCode}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Date: {formatDate(e.date)}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', mt: 4 }}
        >
          No meeting history found.
        </Typography>
      )}
    </div>
  );
}