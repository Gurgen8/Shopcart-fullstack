import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ category, sort, filter }) => {

  const [products, setProducts] = useState([])
  const [filteredProduct, setFilteredProduct] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {

        const res = await axios.get(category ? `http://localhost:5000/product/find?category=${category}` : `http://localhost:5000/product/find`)
        setProducts(res.data)

      } catch (error) {

        console.log(error)
      }
    }
    getProducts()
  }, [category]);

  useEffect(() => {

    category &&
      setFilteredProduct(
        products.filter((item) =>
          Object.entries(filter).every(([key, value]) => {
            return item[key].includes(value)
          })

        )
      )
  }, [category, filter, products])


  useEffect(() => {
    if (sort === "newest") {
      setFilteredProduct((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProduct((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProduct((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);


  return (
    <Container>
      {category ?
        filteredProduct.map((item) => (
          <Product item={item} key={item._id} />
        )) :
        products.slice(0,10).map((item) => (
          <Product item={item} key={item._id} />
        ))
      }
    </Container>
  );
};

export default Products;
