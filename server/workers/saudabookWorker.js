const { parentPort } = require("worker_threads");
const saudabookService = require("../services/saudabook.service");

parentPort.on("message", async (task) => {
  if (task === "fetchData") {
    try {
      const data = await saudabookService.getAll();
      parentPort.postMessage(data);
    } catch (error) {
      parentPort.postMessage({ error: "Failed to fetch data" });
    }
  }
});