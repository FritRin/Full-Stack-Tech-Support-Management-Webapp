import express from 'express';
import { Router } from 'express';
import * as queryController  from '../controllers/queries.js';
import authenticateToken from '../middleware/authenticateToken.js';
import checkRole from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/products', authenticateToken, checkRole('view'), queryController.getProducts);
router.get('/products/:productcode', authenticateToken, checkRole('view'), queryController.getProductByCode);
router.post('/products', authenticateToken, checkRole('admin'), queryController.createProduct);
router.put('/products/:productcode', authenticateToken, checkRole('admin'), queryController.updateProduct);
router.delete('/products/:productcode', queryController.deleteProduct);

router.get('/customers', authenticateToken, checkRole('admin', 'technician'), queryController.getCustomers);
router.get('/customers/search', authenticateToken, checkRole('admin', 'technician'), queryController.searchCustomer);
router.get('/customers/:customerid', authenticateToken, checkRole('admin', 'technician'), queryController.getCustomerById);
router.post('/customers', authenticateToken, checkRole('admin'), queryController.createCustomer);
router.put('/customers/:customerid', queryController.updateCustomer);
router.post('/customers/login', queryController.loginCustomer);

router.get('/technicians', authenticateToken, checkRole('admin', 'technician'), queryController.getTechnicians);
router.get('/technicians/:techid', authenticateToken, checkRole('admin', 'technician'), queryController.getTechnicianById);
router.post('/technicians', authenticateToken, checkRole('admin'), queryController.createTechnician);
router.put('/technicians/:techid', queryController.updateTechnician);
router.delete('/technicians/:techid', authenticateToken, checkRole('admin'), queryController.deleteTechnician);

router.get('/registrations/:customerid', authenticateToken, checkRole('admin', 'customer'), queryController.getRegistrations);
router.post('/registrations', authenticateToken, checkRole('customer'), queryController.registerCustomer);

export default router;