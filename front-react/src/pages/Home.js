// src/components/Home.js
import React, { useState } from "react";
import { Container, Typography, TextField, Button, Paper, Grid } from "@mui/material";

const Home = () => {
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Webhook URL: ${url}`);
    // Handle the submission of the URL
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "50px" }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Webhook Tester
      </Typography>
      <Typography variant="h5" align="center" paragraph>
        Easily test and debug your webhooks by sending data to a unique URL.
      </Typography>

      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                variant="outlined"
                label="Enter your webhook URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-webhook-url.com"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button type="submit" variant="contained" color="primary" fullWidth style={{ height: "100%" }}>
                Create a New Webhook
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Typography variant="body1" align="center" style={{ marginTop: "20px" }}>
        Once you create a webhook, you can send requests to this URL and view the responses.
      </Typography>
    </Container>
  );
};

export default Home;
