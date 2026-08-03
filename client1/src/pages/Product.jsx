import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
    const { productCode } = useParams();

    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${productCode}`);

                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                } else if (response.status === 404) {
                    setError('Product not found.');
                } else {
                    setError('Failed to fetch product.');
                }
            } catch (error) {
                console.error(error);
                setError('Internal server error.');
            }
        };

        fetchProduct();
    }, [productCode]);

    if (error) {
        return <p>{error}</p>
    }

    if(!product){
        return <p>Loading...</p>
    }

    return (
        <div className='container'>
            <div className='main-panel'>
                <h2>Product Details</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Product Code</th>
                            <th>Product Name</th>
                            <th>Version</th>
                            <th>Release Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{product.productCode}</td>
                            <td>{product.name}</td>
                            <td>{product.version}</td>
                            <td>{product.releaseDate}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Product;