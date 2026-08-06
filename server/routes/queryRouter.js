import express from 'express';
import { Router } from 'express';
import * as queryController  from '../controllers/queries.js';
import authenticateToken from '../middleware/authenticateToken.js';
import checkRole from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/products', authenticateToken, checkRole('admin', 'technician', 'customer'), queryController.getProducts);
router.get('/products/:productcode', authenticateToken, checkRole('admin', 'technician', 'customer'), queryController.getProductByCode);
router.post('/products', authenticateToken, checkRole('admin'), queryController.createProduct);
router.put('/products/:productcode', authenticateToken, checkRole('admin'), queryController.updateProduct);
router.delete('/products/:productcode', authenticateToken, checkRole('admin'), queryController.deleteProduct);

router.get('/customers', authenticateToken, checkRole('admin', 'technician'), queryController.getCustomers);
router.get('/customers/search', authenticateToken, checkRole('admin', 'technician'), queryController.searchCustomer);
router.get('/customers/:customerid', authenticateToken, checkRole('admin', 'technician'), queryController.getCustomerById);
router.post('/customers', authenticateToken, checkRole('admin'), queryController.createCustomer);
router.put('/customers/:customerid', authenticateToken, checkRole('customer'), queryController.updateCustomer);
router.post('/login', queryController.loginUser);

router.get('/technicians', authenticateToken, checkRole('admin', 'technician'), queryController.getTechnicians);
router.get('/technicians/:techid', authenticateToken, checkRole('admin', 'technician'), queryController.getTechnicianById);
router.post('/technicians', authenticateToken, checkRole('admin'), queryController.createTechnician);
router.put('/technicians/:techid', authenticateToken, checkRole('technician'), queryController.updateTechnician);
router.delete('/technicians/:techid', authenticateToken, checkRole('admin'), queryController.deleteTechnician);

router.get('/registrations/:customerid', authenticateToken, checkRole('admin', 'customer'), queryController.getRegistrations);
router.post('/registrations', authenticateToken, checkRole('customer'), queryController.registerCustomer);

router.get('/incidents', authenticateToken, checkRole('admin'), queryController.getIncidents);
router.get('/incidents/assigned', authenticateToken, checkRole('technician'), queryController.getAssignedIncidents);
router.get('/incidents/unresolved', authenticateToken, checkRole('customer'), queryController.getOpenIncidents);
router.post('/incidents', authenticateToken, checkRole('admin'), queryController.createIncident);
router.put('/incidents/:incidentid/assign', authenticateToken, checkRole('admin'), queryController.assignIncident);
router.put('/incidents/:incidentid/update', authenticateToken, checkRole('technician'), queryController.updateIncident);

export default router;