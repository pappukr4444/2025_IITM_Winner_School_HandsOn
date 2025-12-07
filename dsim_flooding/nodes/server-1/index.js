// node-template/index.js
const express = require('express');
const cors = require('cors');

// Correct relative imports for generated folder structure
// nodes/nodeX/index.js --> ../../framework/...
const graph = require('../../framework/helper_modules/graph.js');
const protocol = require('../../framework/protocol.js');

const app = express();

// PORT comes from CLI argument: node index.js <PORT>
const PORT = Number(process.argv[2]);
if (!PORT) {
  console.error("Usage: node index.js <PORT>");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// --- Initialize node context ---
const myNodeID = graph.findCurrentNodeByPORT(PORT);
if (!myNodeID || myNodeID.startsWith("check")) {
  console.error("Invalid or unmatched NodeID for port", PORT);
  process.exit(1);
}
global.glb_nodeID = myNodeID;
protocol.setNodeContext(myNodeID);

console.log(`Node started at ID=${myNodeID}, PORT=${PORT}`);

// --- Global storage ---
global.glb_floodingLogs = [];
global.glb_floodingData = [];

// Logs helper
function addLog(message) {
  const logEntry = `[${global.glb_nodeID}] ${new Date().toISOString()} - ${message}`;
  console.log(logEntry);
  global.glb_floodingLogs.push(logEntry);
}

// --- Routes ---

app.post('/api/flooding', (req, res) => {
  addLog(`POST /api/flooding received: ${JSON.stringify(req.body)}`);

  if (req.body.data) {
    global.glb_floodingData.push(req.body.data);
  }

  protocol.floodingAlgorithm(global.glb_nodeID, req.body);
  res.json({ [PORT]: req.body });
});

app.get('/api/flooding-logs', (req, res) => {
  res.json({ node: global.glb_nodeID, logs: global.glb_floodingLogs });
});

app.get('/api/flooding-results', (req, res) => {
  res.json({ node: global.glb_nodeID, data: global.glb_floodingData });
});

app.get('/api/status', (req, res) => {
  res.json({
    node: global.glb_nodeID,
    port: PORT,
    running: true,
    received: global.glb_floodingData.length > 0
  });
});

// --- Start server ---
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
