const { parentPort } = require("worker_threads");
const saudabookcomService = require("../services/saudabookcom.service");

parentPort.on("message", async (task) => {
  if (task === "fetchData") {
    try {
      const data = await saudabookcomService.getAll();
      parentPort.postMessage(data);
    } catch (error) {
      parentPort.postMessage({ error: "Failed to fetch data" });
    }
  }
});