# Installation Instructions

- Credentials for initial login: admin, password
- Technician passwords are pass123
- Customer passwords are password

## Prerequisites

- Docker Desktop (ensure this application is running before attempting to install the application)
- A modern web browser (Google Chrome, Microsoft Edge, Firefox etc)

1. Open a terminal and navigate into the project directory

2. Run `docker compose up --build`

3. Navigate to `http://localhost` to access the application

# API Documentation

## Products
- Get all products
- Method: GET
- Path: /api/products
- Successful Response: 200 OK (returns full product table)

- Get product by product code
- Method: GET
- Path: /api/products/:productCode
- Successful Response: 200 OK (returns table row with specific product)
- Parameters: productCode

- Create product
- Method: POST
- Path: /api/products
- Successful Response: 201 Created (returns product table with new product)

- Update product
- Method: PUT
- Path: /api/products/:productCode
- Successful Response: 200 OK (returns table with updated product)
- parameters: productCode

- Delete product
- Method: DELETE
- Path: /api/products/:productCode
- Successful Response: 200 OK (returns table without deleted product)
- parameters: productCode

## Technicians
- Get all technicians
- Method: GET
- Path: /api/technicians
- Successful Response: 200 OK (returns full technician table)

- Get technician by technician code
- Method: GET
- Path: /api/technicians/:techId
- Successful Response: 200 OK (returns table row with specific technician)
- Parameters: techId

- Create technician
- Method: POST
- Path: /api/technicians
- Successful Response: 201 Created (returns technician table with new technician)

- Update technician
- Method: PUT
- Path: /api/technicians/:techId
- Successful Response: 200 OK (returns table with updated technician)
- parameters: techId

- Delete technician
- Method: DELETE
- Path: /api/technicians/:techId
- Successful Response: 200 OK (returns table without deleted technician)
- parameters: techId

## Customers
- Get all customers
- Method: GET
- Path: /api/customers
- Successful Response: 200 OK (returns full customer table)

- Search customer by last name
- Method: GET
- Path: /api/customers/search?lastName={lastName}
- Successful Response: 200 OK (returns table with customers matching search)
- Paramaters: lastName

- Get customer by customer code
- Method: GET
- Path: /api/customers/:customerId
- Successful Response: 200 OK (returns table row with specific customer)
- Parameters: customerId

- Create customer
- Method: POST
- Path: /api/customers
- Successful Response: 201 Created (returns customer table with new customer)

- Update customer
- Method: PUT
- Path: /api/customers/:customerId
- Successful Response: 200 OK (returns table with updated customer)
- parameters: customerId

- Delete customer
- Method: DELETE
- Path: /api/customers/:customerId
- Successful Response: 200 OK (returns table without deleted customer)
- parameters: customerId

- Login customer
- Method: POST
- Path: /api/customers/login
- Successful Response: 200 OK (redirects to customer registrations page)
- parameters: customerId, email, password

## Registrations
- Register a product
- Method: POST
- Path: /api/registrations
- Successful Response: 201 created (displays table with new registration)

- Get all registrations
- Method: GET
- Path: /api/registrations/:customerId
- Successful Response: 200 OK (displays table of products registered to logged in customer)