import { Client } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
      res.status(500).json({
        error: 'Internal server error.'
    })
    }
}

//GET method to view specific product
const getProductByCode = async (req, res) => {
  const productCode = req.params.productcode
    try {
      const results = await client.query('SELECT * FROM products WHERE productcode = $1', [productCode])
      
      if (results.rows.length === 0){
        return res.status(404).json({
          error: 'Product not found.'
        })
      }
      
      const row = results.rows[0];
      res.status(200).json({
        productCode: row.productcode,
        name: row.name,
        version: row.version,
        releaseDate: row.releasedate.toISOString().split('T')[0],
    });
    } catch (err) {
      res.status(500).json({
        error: 'Internal server error.'
    })
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
      console.error();
      res.status(500).json({
        error: 'Internal server error.'
      }) 
    }
}

//PUT method to update an existing product
const updateProduct = async (req, res) => {
  const productCode = req.params.productcode
  const { name, version } = req.body
    try {
      const results = await client.query('UPDATE products SET name = $1, version = $2 WHERE productcode = $3 RETURNING *', [name, version, productCode])
      
      if (results.rows.length === 0){
        return res.status(404).json({
          error: 'Product not found.'
        })
      }
      
      const row = results.rows[0];
      res.status(200).json({
        productCode: row.productcode,
        name: row.name,
        version: row.version,
        releaseDate: row.releasedate.toISOString().split('T')[0],
    });
    } catch (err) {
      res.status(500).json({
        error: 'Internal server error.'
    })
  }
}

//DELETE method to delete an existing product
const deleteProduct = async (req, res) => {
  const productCode = req.params.productcode
    try {
      const results = await client.query('DELETE FROM products WHERE productcode = $1 RETURNING *', [productCode])
      
      if (results.rows.length === 0){
        return res.status(404).json({
          error: 'Product not found.'
        })
      }
      
      const row = results.rows[0];
      res.status(200).json({
        productCode: row.productcode,
        name: row.name,
        version: row.version,
        releaseDate: row.releasedate.toISOString().split('T')[0],
    });
    } catch (err) {
      res.status(500).json({
        error: 'Internal server error.'
    })
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
      res.status(500).json({
        error: 'Internal server error.'
    })
    }
}

//GET a specific technician
const getTechnicianById = async (req, res) => {
  const techId = req.params.techid

    try {
      const results = await client.query('SELECT * FROM technicians WHERE techid = $1', [techId])
      
      if (results.rows.length === 0){
        return res.status(404).json({
          error: 'Technician not found.'
        })
      }
      
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
      res.status(500).json({
        error: 'Internal server error.'
    })
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
      console.error();
      res.status(500).json({
        error: 'Internal server error.'
      })
    }
}

//PUT update a technician
const updateTechnician = async (req, res) => {
  const techId = req.params.techid
  const { firstName, lastName, email, phone, password } = req.body
    try {
      const results = await client.query('UPDATE technicians SET firstname = $1, lastname = $2, email = $3, phone = $4, password = $5 WHERE techid = $6 RETURNING *', 
        [firstName, lastName, email, phone, password, techId])

      if (results.rows.length === 0){
        return res.status(404).json({
          error: 'Technician not found.'
        })
      }
      
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
      res.status(500).json({
        error: 'Internal server error.'
    })
    }
}

//DELETE a technician
const deleteTechnician = async (req, res) => {
  const techId = req.params.techid
    try {
      const results = await client.query('DELETE FROM technicians WHERE techid = $1 RETURNING *', [techId])
      
      if (results.rows.length === 0){
        return res.status(404).json({
          error: 'Technician not found.'
        })
      }
      
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
      res.status(500).json({
        error: 'Internal server error.'
    })
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
        phone: row.phone,
        email: row.email,
        password: row.password
      }));
      res.status(200).json(customers)
    } catch (err) {
      res.status(500).json({
        error: 'Internal server error.'
    })
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
        phone: row.phone,
        email: row.email,
        password: row.password
      }));
      res.status(200).json(customers)
    } catch (err) {
      res.status(500).json({
        error: 'Internal server error.'
    })
    }
}

//GET a specific customer
const getCustomerById = async (req, res) => {
  const customerId = req.params.customerid
    try {
      const results = await client.query('SELECT * FROM customers WHERE customerid = $1', [customerId])
      
      if (results.rows.length === 0){
        return res.status(404).json({
          error: 'Customer not found.'
        })
      }

      const row = results.rows[0];
      res.status(200).json({
        customerId: row.customerid,
        firstName: row.firstname,
        lastName: row.lastname,
        phone: row.phone,
        email: row.email,
        password: row.password
    })
    } catch (err) {
      res.status(500).json({
        error: 'Internal server error.'
    })
    }
}

//POST create a new Customer
const createCustomer = async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const results = await client.query('INSERT INTO customers (firstname, lastname, phone, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING firstname, lastname, phone, email', 
        [firstName, lastName, phone, email, hashedPassword])
      const row = results.rows[0];
      res.status(201).json({
        customerId: row.customerid,
        firstName: row.firstname,
        lastName: row.lastname,
        phone: row.phone,
        email: row.email,
        password: row.password
    })
    } catch (err) {
      console.error();
      res.status(500).json({
        error: 'Failed to add customer.'
      })
    }
}

//PUT update a Customer
const updateCustomer = async (req, res) => {
  const customerId = req.params.customerid
  const { firstName, lastName, phone, email, password } = req.body
    try {
      const results = await client.query('UPDATE customers SET firstname = $1, lastname = $2, phone = $3, email = $4, password = $5 WHERE customerid = $6 RETURNING *', 
        [customerId, firstName, lastName, phone, email, password])

      if (results.rows.length === 0){
        return res.status(404).json({
          error: 'Customer not found.'
        })
      }

      const row = results.rows[0];
      res.status(200).json({
        customerId: row.customerid,
        firstName: row.firstname,
        lastName: row.lastname,
        phone: row.phone,
        email: row.email,
        password: row.password
    })
    } catch (err) {
      res.status(500).json({
        error: 'Internal server error.'
    })
    }
}

//login
const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const results = await client.query(
      'SELECT * FROM customers where email = $1', [email]
    );

    if (results.rows.length === 0){
      return res.status(401).json({
        error: 'Invalid email or password.'
      });
    }

    const customer = results.rows[0];

    const passwordMatch = await bcrypt.compare(
      password,
      customer.password
    );

    if (!passwordMatch){
      return res.status(401).json({
        error: 'Invalid email or password.'
      })
    }

    const token = jwt.sign(
      {
        customerId: customer.customerId
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );
  } catch (err){
    res.status(500).json({
        error: 'Internal server error.'
    })
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
      res.status(500).json({
        error: 'Internal server error.'
    })
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
      console.error();
      res.status(500).json({
        error: 'Internal server error.'
    })
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
  loginCustomer,
  getRegistrations,
  registerCustomer,
}
//Testing the functions
//createProduct('SAM10', 'Sample Product 1.0', 1.0, '2025-07-09');
//getProduct('SAM10');
//updateProduct('SAM10', 'Sample Product 2.0', 2.0);
//deleteProduct('SAM10');
//getAllProducts();

