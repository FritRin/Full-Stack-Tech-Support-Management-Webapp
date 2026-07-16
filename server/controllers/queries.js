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
      res.status(200).json(results.rows)
    } catch (err) {
      throw err
    }
}

//GET method to view specific product
const getProductByCode = async (req, res) => {
  const productcode = req.params.productcode
    try {
      const results = await client.query('SELECT * FROM products WHERE productcode = $1', [productcode])
      res.status(200).json(results.rows)
    } catch (err) {
      throw err
    }
}

//POST method to add a new product
const createProduct = async (req, res) => {
  const { productcode, name, version, releasedate } = req.body
    try {
      const results = await client.query('INSERT INTO products (productcode, name, version, releasedate) VALUES ($1, $2, $3, $4) RETURNING *', [productcode, name, version, releasedate])
      res.status(201).send('Product successfully created: ${results.rows[0]}')
    } catch (err) {
      throw err  
    }
}

//PUT method to update an existing product
const updateProduct = async (req, res) => {
  const productcode = req.params.productcode
  const { name, version } = req.body
    try {
      await client.query('UPDATE products SET name = $1, version = $2 WHERE productcode = $3 RETURNING *', [name, version, productcode])
      res.status(200).send('Product with code ${productcode} was successfully updated.')
    } catch (err) {
      throw err
    }
}

//DELETE method to delete an existing product
const deleteProduct = async (req, res) => {
  const productcode = req.params.productcode
    try {
      await client.query('DELETE FROM products WHERE productcode = $1 RETURNING *', [productcode])
      res.status(200).send('Product with code $1 was successfully deleted.')
    } catch (err) {
      throw err
    }
}

//GET all technicians
const getTechnicians = async (req, res) => {
    try {
      const results = await client.query('SELECT * FROM technicians')
      res.status(200).json(results.rows)
    } catch (err) {
      throw err
    }
}

//GET a specific technician
const getTechnicianById = async (req, res) => {
  const techid = req.params.techid

    try {
      const results = await client.query('SELECT * FROM technicians WHERE techid = $1', [techid])
      res.status(200).json(results.rows)
    } catch (err) {
      throw err
    }
}

//POST create a new technician
const createTechnician = async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body
    try {
      const results = await client.query('INSERT INTO technicians (firstname, lastname, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
        [firstname, lastname, email, phone, password])
      res.status(201).send('New technician was successfully created: ${results.rows[0]}')
    } catch (err) {
      throw err
    }
}

//PUT update a technician
const updateTechnician = async (req, res) => {
  const techid = req.params.techid
  const { firstname, lastname, email, phone, password } = req.body
    try {
      await client.query('UPDATE technicians SET firstname = $1, lastname = $2, email = $3, phone = $4, password = $5 WHERE techid = $6 RETURNING *', 
        [firstname, lastname, email, phone, password, techid])
      console.log('Updated technician with ID: ${techid}')
    } catch (err) {
      throw err
    }
}

//DELETE a technician
const deleteTechnician = async (req, res) => {
  const techid = req.params.techid
    try {
      await client.query('DELETE FROM technicians WHERE techid = $1 RETURNING *', [techid])
      res.status(200).send('Technician with ID ${techid} was deleted.')
    } catch (err) {
      throw err
    }
}

//GET all Customers
const getCustomers = async (req, res) => {
    try {
      const results = await client.query('SELECT * FROM customers')
      res.status(200).json(results.rows)
    } catch (err) {
      throw err
    }
}

//search customers by last name
const searchCustomer = async (req, res) => {
  const lastname = req.body
    try {
      const results = await client.query('SELECT * FROM customers WHERE lastname = $1', [lastname])
      res.status(200).json(results.rows)
    } catch (err) {
      throw err
    }
}

//GET a specific customer
const getCustomerById = async (req, res) => {
  const customerid = req.params.customerid
    try {
      const results = await client.query('SELECT * FROM customers WHERE customerid = $1', [customerid])
      res.status(200).json(results.rows)
    } catch (err) {
      throw err
    }
}

//POST create a new Customer
const createCustomer = async (req, res) => {
  const { firstname, lastname, address, city, state, postalcode, phone, email, password } = req.body
    try {
      const results = await client.query('INSERT INTO customers (firstname, lastname, address, city, state, postalcode, phone, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', 
        [firstname, lastname, address, city, state, postalcode, phone, email, password])
      res.status(201).send('New customer was created: ${results.rows[0]}')
    } catch (err) {
      throw err
    }
}

//PUT update a Customer
const updateCustomer = async (req, res) => {
  const customerid = req.params.customerid
  const { firstname, lastname, address, city, state, postalcode, phone, email, password } = req.body
    try {
      await client.query('UPDATE customers SET firstname = $1, lastname = $2, address = $3, city = $4, state = $5, postalcode = $6, phone = $7, email = $8, password = $9 WHERE customerid = $10 RETURNING *', 
        [customerid, firstname, lastname, address, city, state, postalcode, phone, email, password])
      res.status(200).send('Customer with ID ${customerid} was successfully updated.')
    } catch (err) {
      throw err
    }
}

//GET list of products registred to specific customer
const getRegistrations = async (req, res) => {
  const customerid = req.params.customerid
    try {
      const results = await client.query('SELECT * FROM registrations WHERE customerid = $1', [customerid])
      res.status(200).json(results.rows)
    } catch (err) {
      throw err
    }
}

//Register product for a customer
const registerCustomer = async (req, res) => {
  const customerid = req.params.customerid
  const { productcode, registrationdate } = req.body
    try {
        const results = await client.query('INSERT INTO registrations (customerid, productcode, registrationdate) VALUES ($1, $2, $3)', [customerid, productcode, registrationdate]);
        res.status(201).send('Successfully registered product to customer: ${res.rows[0]}')
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

