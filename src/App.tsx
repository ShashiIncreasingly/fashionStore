import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { HomePage } from './pages/HomePage';
import ProductListPage from './pages/ProductsListPage';
import { CartPage } from './pages/CartPage';
import NavBars from './components/Nav/NavBars';
import ErrorPage from './pages/ErrorPage';
import { ProductPage } from './pages/ProductPage';
import Footer from './components/Footer/Footer';
import { ProductsArray } from './data/DataType';
import { useLocation } from 'react-router-dom';
import { Banner } from './components/Banner/Banner';
const App: React.FC = () => {
  const location = useLocation();
  const state = location.state as { product: ProductsArray };
  const product:ProductsArray ={"id":1,"title":"","price":0,"description":"","category":"","image":"","rating":{"rate":0,"count":0}};
  return (
    <div className="App">
        <>
        <NavBars />
        <Banner />
        </>
        <Container className='mb-4 app-container'>
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/store' element={<ProductListPage/>}></Route>
            <Route path='/product-listing/:param?' element={<ProductListPage/>}></Route>
            {/* <Route path="/product/:id?" render={() => <ProductPage  product={product}  />} /> */}
            <Route path="/product/:id?" element={<ProductPage />} />
            <Route path='/cart' element={<CartPage/>}></Route>
            <Route path='*' element={<ErrorPage/>}></Route>
          </Routes>
        </Container>
        <Footer />
    </div>
  );
}

export default App;




// const LoaderFeature = (props) => (
//   <ContentLoader viewBox="0 0 900 507" height={507} width={900} {...props}>
//     <rect x="30" y="60" rx="0" ry="0" width="200" height="120" />
//     <rect x="30" y="189" rx="0" ry="0" width="200" height="15" />
//     <rect x="30" y="211" rx="0" ry="0" width="140" height="15" />
//     <rect x="243" y="60" rx="0" ry="0" width="200" height="120" />
//     <rect x="243" y="189" rx="0" ry="0" width="200" height="15" />
//     <rect x="243" y="211" rx="0" ry="0" width="140" height="15" />
//     <rect x="455" y="60" rx="0" ry="0" width="200" height="120" />
//     <rect x="455" y="189" rx="0" ry="0" width="200" height="15" />
//     <rect x="455" y="211" rx="0" ry="0" width="140" height="15" />
//   </ContentLoader>
// )
