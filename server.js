const express = require("express");

const app = express();

const LOGIN = "daniil1"; 

function getToday() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Amsterdam",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).formatToParts(new Date());

  const dd = parts.find(part => part.type === "day").value;
  const mm = parts.find(part => part.type === "month").value;
  const yyyy = parts.find(part => part.type === "year").value;
  const yy = yyyy.slice(-2);

  return {
    urlDate: `${dd}${mm}${yy}`,
    jsonDate: `${dd}-${mm}-${yyyy}`
  };
}

app.get("/", (req, res) => {
  res.type("text/plain").send("OK");
});

app.get("/api/rv/:abc", (req, res) => {
  const abc = req.params.abc;

  if (!/^[a-z]+$/.test(abc)) {
    return res.status(404).send("Not found");
  }

  res.type("text/plain").send(abc.split("").reverse().join(""));
});

app.get("/:date", (req, res) => {
  const today = getToday();

  if (req.params.date !== today.urlDate) {
    return res.status(404).send("Not found");
  }

  res.json({
    date: today.jsonDate,
    login: LOGIN
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0");