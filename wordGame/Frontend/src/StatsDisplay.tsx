import { Card, CardContent, Typography, Box } from "@mui/material";

const StatsDisplay = ({
  wins,
  attempts,
}: {
  wins: number;
  attempts: number;
}) => {
  return (
    <Card
      sx={{
        width: 300,
        margin: "0 auto",
        padding: 2,
        borderRadius: 4,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          align="center"
          gutterBottom
          sx={{
            color: "#333",
            borderBottom: "2px solid #ccc",
            paddingBottom: 1,
            marginBottom: 2,
          }}
        >
          Player Stats
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight="bold">
            Tries
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {attempts}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" color="#563A9C">
            Wins
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {wins}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsDisplay;
