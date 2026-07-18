import express from 'express';
import { Router } from 'express';
import * as queryController  from '../controllers/queries.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = Router();

router.get('/products', queryController.getProducts);
router.get('/products/:productcode', queryController.getProductByCode);
router.post('/products', queryController.createProduct);
router.put('/products/:productcode', queryController.updateProduct);
router.delete('/products/:productcode', queryController.deleteProduct);

router.get('/customers', queryController.getCustomers);
router.get('/customers/search', queryController.searchCustomer);
router.get('/customers/:customerid', queryController.getCustomerById);
router.post('/customers', queryController.createCustomer);
router.put('/customers/:customerid', queryController.updateCustomer);

router.get('/technicians', queryController.getTechnicians);
router.get('/technicians/:techid', queryController.getTechnicianById);
router.post('/technicians', queryController.createTechnician);
router.put('/technicians/:techid', queryController.updateTechnician);
router.delete('/technicians/:techid', queryController.deleteTechnician);

router.get('/registrations/:customerid', queryController.getRegistrations);
router.post('/login', queryController.loginCustomer);
router.post('/registrations', authenticateToken, queryController.registerCustomer);

export default router;