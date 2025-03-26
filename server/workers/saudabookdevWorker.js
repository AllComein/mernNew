const { parentPort } = require("worker_threads");
const saudabookdevService = require("../services/saudabookdev.service");

parentPort.on("message", async (task) => {
  if (task === "fetchData") {
    try {
      const data = await saudabookdevService.getAll();
      parentPort.postMessage(data);
    } catch (error) {
      parentPort.postMessage({ error: "Failed to fetch data" });
    }
  }
});