<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    px: 3,
    py: 2,
    background: "#111827",
    color: "#fff"
  }}
>
  {/* LEFT SIDE */}
  <Typography fontWeight="bold">
    💪 FitAI Dashboard
  </Typography>

  {/* RIGHT SIDE */}
  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    
    <Typography sx={{ opacity: 0.9 }}>
      👤 Welcome, {username}
    </Typography>

    <Button
      variant="contained"
      color="secondary"
      onClick={logOut}
      sx={{ borderRadius: 2 }}
    >
      Logout
    </Button>

  </Box>
</Box>