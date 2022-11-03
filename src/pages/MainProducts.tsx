import React, { FormEvent, useEffect, useRef, useState } from "react";
import ProductCard from "../features/store/components/ProductCard";
import { Col, Container, Row } from "react-bootstrap";
import allProductsService from "../features/store/services/allProductsService";
import Center from "../components/layout/Center";
import { productType } from "../types/types";
import FillHieght from "../components/layout/FillHieght";
import ProductCardList from "../features/store/components/ProductCardList";
import { Input } from "../components/forms/Input";


export default function MainProducts() {
  const [{ loading, data, error }, refresh] = allProductsService();
  const [searchWord, setSearchWord] = useState<string>('')

  useEffect(() => {
    refresh()
  }, [])

  function handleSearch(e: FormEvent){
    e.preventDefault()
    refresh({
      params: {search: searchWord}
    })
    
  }

  return (
    <>
      <form onSubmit={handleSearch} className="mb-5 d-flex justify-content-center">
        <Input onChange={(e) => setSearchWord((e.target as HTMLInputElement).value)} className="search-input" style={{width: '400px'}} />
      </form>
      {loading ? (
        <FillHieght>
          <Center>
            <div>

            loading ...
            </div>
          </Center>

        </FillHieght>
      ) : (

        <ProductCardList refresh={refresh} data={data} variant="lg" />
      )}

      
    </>
  );
}
