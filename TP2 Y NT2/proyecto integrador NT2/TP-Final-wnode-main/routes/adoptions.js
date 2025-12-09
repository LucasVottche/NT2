var express = require('express');
var router = express.Router();
const controller = require('../controllers/adoptions.js');

// GET: Traer todas las adopciones (ESTA FALTABA)
// http://localhost:5000/api/adoptions/
router.get('/', controller.getAdoptions);

// POST: Crear solicitud
// http://localhost:5000/api/adoptions/add-adoption
router.post('/add-adoption', async (req, res) => {
  try {
    const result = await controller.addAdoption(
      req.body.petId,
      req.body.adopterId
    );
    res.send(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT: Aprobar adopción
// http://localhost:5000/api/adoptions/approve-adoption/:id
router.put('/approve-adoption/:id', async (req, res) => {
  try {
    const result = await controller.approveAdoption(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).send('PUT fail: ' + error.message);
  }
});

// DELETE: Rechazar adopción (Devolver a disponible)
router.delete("/reject-adoption/:id", async (req, res) => {
  try {
    const result = await controller.rejectAdoption(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).send('Delete fail: ' + error.message);
  }
});

// DELETE: Eliminar registro
router.delete("/delete-adoption/:id", async (req, res) => {
  try {
    const result = await controller.deleteAdoption(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).send('Delete fail: ' + error.message);
  }
});

module.exports = router;