const express = require("express");
const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  const { lat1, lon1, lat2, lon2 } = req.body;

  const toRad = deg => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  res.json({ distance_km: d });
});

app.listen(3000, () => console.log("Haversine API running"));
