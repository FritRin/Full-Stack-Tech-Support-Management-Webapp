import { Client } from 'pg';

const client = new Client({
  user: 'victoria',
  host: 'db',
  database: 'sportsprotechsupportdb',
  password: 'sqlpass',
  port: 5432,
});

client.connect();


//GET method to view all products
const getProducts = async (req, res) => {
    try {
      const results = await client.query('SELECT * FROM products')
        const products = results.rows.map(row => ({
        productCode: row.productcode,
        name: row.name,
        version: row.version,
        releaseDate: row.releasedate.toISOString().split('T')[0],
      }));
      res.status(200).json(products)
    } catch (err) {
      throw err
    }
}

//GET method to view specific product
const getProductByCode = async (req, res) => {
  const productCode = req.params.productcode
    try {
      const results = await client.query('SELECT * FROM products WHERE productcode = $1', [productCode])
      const row = results.rows[0];
      res.status(200).json({
        productCode: row.productcode,
        name: row.name,
        version: row.version,
        releaseDate: row.releasedate.toISOString().split('T')[0],
    });
    } catch (err) {
      throw err
    }
}

//POST method to add a new product
const createProduct = async (req, res) => {
  const { productCode, name, version, releaseDate } = req.body
    try {
      const results = await client.query('INSERT INTO products (productcode, name, version, releasedate) VALUES ($1, $2, $3, $4) RETURNING *', [productCode, name, version, releaseDate])
      const row = results.rows[0];
      res.status(201).json({
        productCode: row.productcode,
        name: row.name,
        version: row.version,
        releaseDate: row.releasedate,
    });
    } catch (err) {
      throw err  
    }
}

//PUT method to update an existing product
const updateProduct = async (req, res) => {
  const productCode = req.params.productcode
  const { name, version } = req.body
    try {
      const results = await client.query('UPDATE products SET name = $1, version = $2 WHERE productcode = $3 RETURNING *', [name, version, productCode])
      const row = results.rows[0];
      res.status(200).json({
        productCode: row.productcode,
        name: row.name,
        version: row.version,
        releaseDate: row.releasedate.toISOString().split('T')[0],
    });
    } catch (err) {
      throw err
    }
}

//DELETE method to delete an existing product
const deleteProduct = async (req, res) => {
  const productCode = req.params.productcode
    try {
      const results = await client.query('DELETE FROM products WHERE productcode = $1 RETURNING *', [productCode])
      const row = results.rows[0];
      res.status(200).json({
        productCode: row.productcode,
        name: row.name,
        version: row.version,
        releaseDate: row.releasedate.toISOString().split('T')[0],
    });
    } catch (err) {
      throw err
    }
}

//GET all technicians
const getTechnicians = async (req, res) => {
    try {
      const results = await client.query('SELECT * FROM technicians')
      const technicians = results.rows.map(row => ({
        techId: row.techid,
        firstName: row.firstname,
        lastName: row.lastname,
        email: row.email,
        phone: row.phone,
        password: row.password
      }));
      res.status(200).json(technicians)
    } catch (err) {
      throw err
    }
}

//GET a specific technician
const getTechnicianById = async (req, res) => {
  const techId = req.params.techid

    try {
      const results = await client.query('SELECT * FROM technicians WHERE techid = $1', [techId])
      const row = results.rows[0];
      res.status(200).json({
        techId: row.techid,
        firstName: row.firstname,
        lastName: row.lastname,
        email: row.email,
        phone: row.phone,
        password: row.password
    })
    } catch (err) {
      throw err
    }
}

//POST create a new technician
const createTechnician = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body
    try {
      const results = await client.query('INSERT INTO technicians (firstname, lastname, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
        [firstName, lastName, email, phone, password])
      const row = results.rows[0];
      res.status(201).json({
        techId: row.techid,
        firstName: row.firstname,
        lastName: row.lastname,
        email: row.email,
        phone: row.phone,
        password: row.password
    })
    } catch (err) {
      throw err
    }
}

//PUT update a technician
const updateTechnician = async (req, res) => {
  const techId = req.params.techid
  const { firstName, lastName, email, phone, password } = req.body
    try {
      const results = await client.query('UPDATE technicians SET firstname = $1, lastname = $2, email = $3, phone = $4, password = $5 WHERE techid = $6 RETURNING *', 
        [firstName, lastName, email, phone, password, techId])
      const row = results.rows[0];
      res.status(200).json({
        techId: row.techid,
        firstName: row.firstname,
        lastName: row.lastname,
        email: row.email,
        phone: row.phone,
        password: row.password
    })
    } catch (err) {
      throw err
    }
}

//DELETE a technician
const deleteTechnician = async (req, res) => {
  const techId = req.params.techid
    try {
      const results = await client.query('DELETE FROM technicians WHERE techid = $1 RETURNING *', [techId])
      const row = results.rows[0];
      res.status(200).json({
        techId: row.techid,
        firstName: row.firstname,
        lastName: row.lastname,
        email: row.email,
        phone: row.phone,
        password: row.password
    })
    } catch (err) {
      throw err
    }
}

//GET all Customers
const getCustomers = async (req, res) => {
    try {
      const results = await client.query('SELECT * FROM customers')
      const customers = results.rows.map(row => ({
        customerId: row.customerid,
        firstName: row.firstname,
        lastName: row.lastname,
        address: row.address,
        city: row.city,
        postalCode: row.postalcode,
        phone: row.phone,
        email: row.email,
        password: row.password
      }));
      res.status(200).json(customers)
    } catch (err) {
      throw err
    }
}

//search customers by last name
const searchCustomer = async (req, res) => {
  const lastName = req.body
    try {
      const results = await client.query('SELECT * FROM customers WHERE lastname = $1', [lastName])
      const customers = results.rows.map(row => ({
        customerId: row.customerid,
        firstName: row.firstname,
        lastName: row.lastname,
        address: row.address,
        city: row.city,
        postalCode: row.postalcode,
        phone: row.phone,
        email: row.email,
        password: row.password
      }));
      res.status(200).json(customers)
    } catch (err) {
      throw err
    }
}

//GET a specific customer
const getCustomerById = async (req, res) => {
  const customerId = req.params.customerid
    try {
      const results = await client.query('SELECT * FROM customers WHERE customerid = $1', [customerId])
      const row = results.rows[0];
      res.status(200).json({
        customerId: row.customerid,
        firstName: row.firstname,
        lastName: row.lastname,
        address: row.address,
        city: row.city,
        postalCode: row.postalcode,
        phone: row.phone,
        email: row.email,
        password: row.password
    })
    } catch (err) {
      throw err
    }
}

//POST create a new Customer
const createCustomer = async (req, res) => {
  const { firstName, lastName, address, city, state, postalCode, phone, email, password } = req.body
    try {
      const results = await client.query('INSERT INTO customers (firstname, lastname, address, city, state, postalcode, phone, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', 
        [firstName, lastName, address, city, state, postalCode, phone, email, password])
      const row = results.rows[0];
      res.status(201).json({
        customerId: row.customerid,
        firstName: row.firstname,
        lastName: row.lastname,
        address: row.address,
        city: row.city,
        postalCode: row.postalcode,
        phone: row.phone,
        email: row.email,
        password: row.password
    })
    } catch (err) {
      throw err
    }
}

//PUT update a Customer
const updateCustomer = async (req, res) => {
  const customerId = req.params.customerid
  const { firstName, lastName, address, city, state, postalCode, phone, email, password } = req.body
    try {
      const results = await client.query('UPDATE customers SET firstname = $1, lastname = $2, address = $3, city = $4, state = $5, postalcode = $6, phone = $7, email = $8, password = $9 WHERE customerid = $10 RETURNING *', 
        [customerId, firstName, lastName, address, city, state, postalCode, phone, email, password])
      const row = results.rows[0];
      res.status(200).json({
        customerId: row.customerid,
        firstName: row.firstname,
        lastName: row.lastname,
        address: row.address,
        city: row.city,
        postalCode: row.postalcode,
        phone: row.phone,
        email: row.email,
        password: row.password
    })
    } catch (err) {
      throw err
    }
}

//GET list of products registred to specific customer
const getRegistrations = async (req, res) => {
  const customerId = req.params.customerid
    try {
      const results = await client.query('SELECT * FROM registrations WHERE customerid = $1', [customerId])
      const products = results.rows.map(row => ({
        customerId: row.customerid,
        productCode: row.productcode,
        registrationDate: row.registrationdate.toISOString().split('T')[0],
      }));
      res.status(200).json(products)
    } catch (err) {
      throw err
    }
}

//Register product for a customer
const registerCustomer = async (req, res) => {
  const customerId = req.params.customerid
  const { productCode, registrationDate } = req.body
    try {
        const results = await client.query('INSERT INTO registrations (customerid, productCode, registrationdate) VALUES ($1, $2, $3)', [customerId, productCode, registrationDate]);
        const row = results.rows[0];
      res.status(201).json({
        customerId: row.customerid,
        productCode: row.productcode,
        registrationDate: row.registrationdate.toISOString().split('T')[0],
    });
    } catch (err){
        throw err
    }
}

export {
  getProducts,
  getProductByCode,
  createProduct,
  updateProduct,
  deleteProduct,
  getTechnicians,
  getTechnicianById,
  createTechnician,
  updateTechnician,
  deleteTechnician,
  getCustomers,
  getCustomerById,
  searchCustomer,
  createCustomer,
  updateCustomer,
  getRegistrations,
  registerCustomer,
}
//Testing the functions
//createProduct('SAM10', 'Sample Product 1.0', 1.0, '2025-07-09');
//getProduct('SAM10');
//updateProduct('SAM10', 'Sample Product 2.0', 2.0);
//deleteProduct('SAM10');
//getAllProducts();

