import { useEffect, useState } from 'react';
import { productAxios } from '../utils/axios';
import { Link, useLocation } from 'react-router-dom';  
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();  

  const fetchProducts = () => {
    productAxios.get('/')
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error('Error fetching products', err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchProducts();
  
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="container py-5 mt-5">
      <div className="text-center mb-4">
        <h1 className="text-primary fw-bold">Hijab Website</h1>
        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div className="row g-4">
        {products.map(product => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product._id}>
            <div className="card h-100 shadow-sm border-primary">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body bg-white text-center">
                <h5 className="card-title text-primary">{product.name}</h5>
                <p className="card-text text-muted">{product.description}</p>
                <p className="fw-bold">${product.price}</p>
                <Link to={`/product/${product._id}`}> Go To Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
