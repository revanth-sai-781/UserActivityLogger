const express = require("express");
const router = express.Router();
const logs = require("../data/logs.json");

router.get("/", (req, res) => {
  const { page = 1, limit = 10, sort = "desc", showDeleted = "false" } = req.query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  //filtering sorted Deleted logs//
  const visibleLogs = logs.filter(log => showDeleted === "true" || !log.isDeleted);

  //sorting the logs based on timestamps//
  const sortedLogs = visibleLogs.sort((a, b) => {
    return sort === "asc"
      ? new Date(a.timestamp) - new Date(b.timestamp)
      : new Date(b.timestamp) - new Date(a.timestamp);
  });

  //Pagination of Sorted Logs
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = pageNum * limitNum;
  const paginatedLogs = sortedLogs.slice(startIndex, endIndex);

  res.json({
    totalLogs: visibleLogs.length,
    page: pageNum,
    limit: limitNum,
    data: paginatedLogs,
  });
});


module.exports = router;
