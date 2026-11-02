import { Client } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
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
  const hashedPassword = await bcrypt.hash(password, 10)
    try {
      const results = await client.query('INSERT INTO technicians (firstname, lastname, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING techid, firstname, lastname, email, phone', 
        [firstName, lastName, email, phone, hashedPassword]);
      const row = results.rows[0];

      await createUser(row.techid, email, hashedPassword, 'technician');

      res.status(201).json({
        techId: row.techid,
        firstName: row.firstname,
        lastName: row.lastname,
        email: row.email,
        phone: row.phone,
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
  const { firstName, lastName, email, phone } = req.body
    try {
      const results = await client.query('UPDATE technicians SET firstname = $1, lastname = $2, email = $3, phone = $4 WHERE techid = $5 RETURNING *', 
        [firstName, lastName, email, phone, techId])

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
        address: row.address,
        city: row.city,
        state: row.state,
        postalCode: row.postalcode,
        countryCode: row.countryCode,
        phone: row.phone,
        email: row.email,
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
  const { lastName } = req.query
    try {
      const results = await client.query('SELECT * FROM customers WHERE lastname = $1', [`${lastName}`])
      
      const customers = results.rows.map(row => ({
        customerId: row.customerid,
        firstName: row.firstname,
        lastName: row.lastname,
        address: row.address,
        city: row.city,
        state: row.state,
        postalCode: row.postalcode,
        countryCode: row.countryCode,
        phone: row.phone,
        email: row.email,
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
        address: row.address,
        city: row.city,
        state: row.state,
        postalCode: row.postalcode,
        countryCode: row.countryCode,
        phone: row.phone,
        email: row.email,
    })
    } catch (err) {
      res.status(500).json({
        error: 'Internal server error.'
    })
    }
}

//POST create a new Customer
const createCustomer = async (req, res) => {
  const { firstName, lastName, address, city, state, postalCode, countryCode, phone, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10);
    try {
      
      const results = await client.query('INSERT INTO customers (firstname, lastname, address, city, state, postalcode, countrycode, phone, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING customerid, firstname, lastname, address, city, state, postalcode, countrycode, phone, email', 
        [firstName, lastName, address, city, state, postalCode, countryCode, phone, email, hashedPassword])
      const row = results.rows[0];
      res.status(201).json({
        customerId: row.customerid,
        firstName: row.firstname,
        lastName: row.lastname,
        address: row.address,
        city: row.city,
        state: row.state,
        postalCode: row.postalcode,
        countryCode: row.countryCode,
        phone: row.phone,
        email: row.email,
    })
    await createUser(row.customerid, email, hashedPassword, 'customer');
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
  const { firstName, lastName, address, city, state, postalCode, countryCode, phone, email, password } = req.body
    try {
      const results = await client.query('UPDATE customers SET firstname = $1, lastname = $2, address = $3, city = $4, state = $5, postalCode = $6, countryCode = $7, phone = $8, email = $9 WHERE customerid = $10 RETURNING *', 
        [firstName, lastName, address, city, state, postalCode, countryCode, phone, email, customerId])

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
        address: row.address,
        city: row.city,
        state: row.state,
        postalCode: row.postalcode,
        countryCode: row.countryCode,
        phone: row.phone,
        email: row.email,
    })
    } catch (err) {
      res.status(500).json({
        error: 'Internal server error.'
    })
    }
}

//login
const loginUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const results = await client.query(
      'SELECT * FROM users where username = $1', [username]
    );

    if (results.rows.length === 0){
      return res.status(401).json({
        error: 'No corresponding user.'
      });
      console.log(username, password, role)
    }

    const user = results.rows[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch){
      return res.status(401).json({
        error: 'Invalid username or password.'
      });
      console.log(username, password, role)
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        userId: user.id,
        username: user.username,
        role: user.role}
    });

  } catch (err){
    console.error('LOGIN FAILED:', err);
    
    res.status(500).json({
        error: 'Internal server error.'
    })
  }
}


const createUser = async (id, username, password, role) => {
    const results = await client.query('INSERT INTO users (id, username, password, role) VALUES ($1, $2, $3, $4) RETURNING username, role', [id, username, password, role]);
    const row = results.rows[0];                                                                                                     
}

//GET list of products registred to specific customer
const getRegistrations = async (req, res) => {
  const customerId = req.params.customerid
    try {
      const results = await client.query('SELECT * FROM registrations WHERE customerid = $1', [customerId]);
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
  const customerId = req.user.id
  const { productCode, registrationDate } = req.body
    try {
        const results = await client.query('INSERT INTO registrations (customerid, productCode, registrationdate) VALUES ($1, $2, $3) RETURNING *', [customerId, productCode, registrationDate]);
        const row = results.rows[0];
      res.status(201).json({
        customerId: row.customerid,
        productCode: row.productcode,
        registrationDate: row.registrationdate.toISOString().split('T')[0],
    });
    } catch (err){
      console.error(err);
      res.status(500).json({
        
        error: 'Internal server error.'
    })
    }
}

const getIncidents = async (req, res) => {
  const { role, id } = req.user;

  try {
    let results;
    if (role === 'admin') {
      results = await client.query('SELECT * FROM incidents');
    }
    else if (role === 'technician') {
      results = await client.query('SELECT * FROM incidents WHERE techid =$1', [id]);
    }
    else if (role === 'customer') {
      results = await client.query('SELECT * FROM incidents WHERE customerid = $1 AND dateclosed IS NULL', [id]);
    }
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(500).json({
        error: 'Internal server error.'
    })
  }
}

const createIncident = async (req, res) => {
  const customerId = req.user.id;
  const { productCode, dateOpened, title, description } = req.body;
  try {
      const results = await client.query('INSERT INTO incidents (customerid, productcode, dateopened, title, description) VALUES ($1, $2, $3, $4, $5) RETURNING *', [customerId, productCode, dateOpened, title, description]);
      const row = results.rows[0];
      res.status(201).json({
      incidentId: row.incidentid,
      customerId: row.customerid,
      productCode: row.productcode,
      techId: row.techid,
      dateOpened: row.dateopened,
      dateClosed: row.dateclosed,
      title: row.title,
      description: row.description,
      });
    } catch (err) {
      res.status(500).json({
        error: 'Internal server error.'
      })
    }
}

const assignIncident = async (req, res) => {
  const techId = req.techId;
  try {
    const results = await client.query('INSERT INTO incidents (techid) VALUES ($1)', [techId]);
    const row = results.rows[0];
    res.status(200).json({
      incidentId: row.incidentid,
      customerId: row.customerid,
      productCode: row.productcode,
      techId: row.techid,
      dateOpened: row.dateopened,
      dateClosed: row.dateclosed,
      title: row.title,
      description: row.description,
    })
  } catch (err) {
    res.status(500).json({
      error: 'Internal server error.'
    })
  }
}

const updateIncident = async (req, res) => {
  const incidentId = req.incidentId;
  const { description, dateClosed } = req.body;
  
  try {const results = await client.query('UPDATE incidents SET description = $1, dateClosed = $2 WHERE incidentid = $3', [description, dateClosed, incidentId]);
  const row = results.rows[0];
    res.status(200).json({
      incidentId: row.incidentid,
      customerId: row.customerid,
      productCode: row.productcode,
      techId: row.techid,
      dateOpened: row.dateopened,
      dateClosed: row.dateclosed,
      title: row.title,
      description: row.description,
    })
  } catch (err) {
    res.status(500).json({
      error: 'Internal server error.'
    })
  }
}

const getCountries = async (req, res) => {
  console.log('1. getCountries reached');
  try {
    console.log('2. querying database')
    const results = await client.query('SELECT * FROM countries');
    console.log('3. db query done')
    const countries = results.rows.map(row => ({
      countryCode: row.countrycode,
      countryName: row.countryname
    }));
    console.log('4. countries mapped')

    res.status(200).json(countries);
    console.log(countries);

    console.log('5. response sent');
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Internal server error.'
    });
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
  loginUser,
  getRegistrations,
  registerCustomer,
  getIncidents,
  createIncident,
  assignIncident,
  updateIncident,
  getCountries
}
//Testing the functions
//createProduct('SAM10', 'Sample Product 1.0', 1.0, '2025-07-09');
//getProduct('SAM10');
//updateProduct('SAM10', 'Sample Product 2.0', 2.0);
//deleteProduct('SAM10');
//getAllProducts();

