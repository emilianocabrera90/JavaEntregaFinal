// ──────────────────────────────────────────────
// src/utils/idGenerator.js
// Devuelve un UUID v4 como string
// ──────────────────────────────────────────────
const { randomUUID } = require('crypto');

function generateId () {
  return randomUUID(); // p. ej. "d3a3ccea-e2f4-4a0d-9f5f-4b5e8d93f2e3"
}

module.exports = generateId;
