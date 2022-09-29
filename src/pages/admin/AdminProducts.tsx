import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MyButton from "../../components/forms/MyButton";
import LoadingComponent from "../../components/LoadingComponent";
import AdminRequired from "../../features/auth/AdminRequired";
import ProductCardList from "../../features/store/components/ProductCardList";
import allProductsService from "../../features/store/services/allProductsService";

export default function AdminProducts() {
  const [{ loading, data, error }, refresh] = allProductsService();
  useEffect(() => {
    refresh();
  }, []);

  return (
    <AdminRequired>
      <LoadingComponent loading={loading}>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mb-5">Manage Products</h1>

          <Link to={"/admin/products/create"}>
            <MyButton variant="outline-success">Add Product</MyButton>
          </Link>
        </div>

        {!loading && (
          <ProductCardList refresh={refresh} data={data} variant="lg" />
        )}
      </LoadingComponent>
    </AdminRequired>
  );
}
