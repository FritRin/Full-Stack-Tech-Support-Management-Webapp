import express from 'express';
import { Router } from 'express';
import * as queryController  from '../controllers/queries.js';
import authenticateToken from '../middleware/authenticateToken.js';
import checkRole from '../middleware/roleMiddleware.js';
import { validateCustomer, validateCustomerId } from '../middleware/validation/customerValidation.js';
import { validateTechnician, validateTechnicianId } from '../middleware/validation/technicianValidation.js';
import { validateProduct } from '../middleware/validation/productValidation.js';
import { validateIncident } from '../middleware/validation/incidentValidation.js';
import { validateRegistration } from '../middleware/validation/registrationValidation.js';

const router = Router();

router.get('/products', authenticateToken, checkRole('admin', 'technician', 'customer'), queryController.getProducts);
router.get('/products/:productcode', authenticateToken, checkRole('admin', 'technician', 'customer'), queryController.getProductByCode);
router.post('/products', authenticateToken, checkRole('admin'), validateProduct, queryController.createProduct);
router.put('/products/:productcode', authenticateToken, checkRole('admin'), validateProduct, queryController.updateProduct);
router.delete('/products/:productcode', authenticateToken, checkRole('admin'), queryController.deleteProduct);

router.get('/customers', authenticateToken, checkRole('admin'), queryController.getCustomers);
router.get('/customers/search', authenticateToken, checkRole('admin'), queryController.searchCustomer);
router.get('/customers/:customerid', authenticateToken, checkRole('admin', 'customer'), validateCustomerId, queryController.getCustomerById);
router.post('/customers', authenticateToken, checkRole('admin'), validateCustomer, queryController.createCustomer);
router.put('/customers/:customerid', authenticateToken, checkRole('admin', 'customer'), validateCustomer, queryController.updateCustomer);
router.post('/login', queryController.loginUser);

router.get('/technicians', authenticateToken, checkRole('admin', 'technician'), queryController.getTechnicians);
router.get('/technicians/:techid', authenticateToken, checkRole('admin', 'technician'), validateTechnicianId, queryController.getTechnicianById);
router.post('/technicians', authenticateToken, checkRole('admin'), validateTechnician, queryController.createTechnician);
router.put('/technicians/:techid', authenticateToken, checkRole('admin', 'technician'), queryController.updateTechnician);
router.delete('/technicians/:techid', authenticateToken, checkRole('admin'), queryController.deleteTechnician);

router.get('/registrations/:customerid', authenticateToken, checkRole('admin', 'customer'), queryController.getRegistrations);
router.post('/registrations', authenticateToken, checkRole('customer'), validateRegistration, queryController.registerCustomer);

router.get('/incidents', authenticateToken, checkRole('admin', 'technician', 'customer'), queryController.getIncidents);
router.post('/incidents', authenticateToken, checkRole('customer'), validateIncident, queryController.createIncident);
router.put('/incidents/:incidentid', authenticateToken, checkRole('admin'), queryController.assignIncident);
router.put('/incidents/:incidentid', authenticateToken, checkRole('technician'), queryController.updateIncident);

router.get('/countries', authenticateToken, checkRole('admin', 'customer'), queryController.getCountries);

export default router;