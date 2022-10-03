import React, { useEffect, useMemo, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Input, InputWithLabel } from "../../components/forms/Input";
import MyButton from "../../components/forms/MyButton";
import ImageContainer from "../../components/images/ImageContainer";
import Center from "../../components/layout/Center";
import LoadingComponent from "../../components/LoadingComponent";
import AdminRequired from "../../features/auth/AdminRequired";
import {
  createProductService,
  deleteProductImageService,
  ProductService,
  updateProductService,
} from "../../features/store/services/allProductsService";
import { BASE_URL } from "../../hooks/useAxios";
import { productType } from "../../types/types";

export default function AdminCreateModifyProduct() {
  const { id } = useParams();
  const create = id !== "create" ? false : true;
  const [productValues, refresh] = ProductService(id!);
  const product = useMemo(
    () => productValues.data as productType,
    [id, productValues.data]
  );
  const [newProduct, setNewProduct] = useState({} as productType);
  const [createProductValues, createProductFetch] = createProductService();
  const [updateProductValues, updateProductFetch] = updateProductService(
    product?.uuid ?? ""
  );
  const { values, deleteImage: deleteOldImage } = deleteProductImageService();
  const navigate = useNavigate();

  const [newImages, setNewImages] = useState<Blob[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);

  const uploadImagesInputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (product) {
      setNewProduct((old) => {
        return { ...product };
      });
    }
  }, [product]);

  useEffect(() => {
    refresh();
  }, [id]);

  function formatDataForSubmittion() {
    const res = new FormData();

    for (let entry in newProduct) {
      res.append(entry, newProduct[entry]);
    }

    newImages.forEach((image, i) => {
      res.append(`image-${i}`, image);
    });

    return res;
  }

  const updateField = (e: any) =>
    setNewProduct((old) => {
      return {
        ...old,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
          .value,
      };
    });

  useEffect(() => {
    setImagesPreviews((old) => []);
    if (newImages.length !== 0) {
      for (let img of newImages) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagesPreviews((oldPreview) => {
            return [...oldPreview, reader.result as string];
          });
        };
        reader.readAsDataURL(img);
      }
    }
  }, [newImages]);

  function showImages(): boolean {
    return imagesPreviews.length !== 0;
  }

  function deleteImage(index: number) {
    setNewImages((oldImages) => {
      const newArr: Blob[] = [...oldImages];
      newArr.splice(index, 1);
      return newArr;
    });
  }

  return (
    <AdminRequired>
      <LoadingComponent loading={productValues.loading}>
        <>
          <h1>
            {create ? "Create new Product" : `Managing (${product?.name})`}
          </h1>
          <div className="m-auto d-flex justify-content-between flex-wrap my-5">
            <InputWithLabel
              label={"Name"}
              name={"name"}
              onChange={updateField}
              defaultValue={newProduct.name}
            />
            <InputWithLabel
              defaultValue={newProduct.description}
              label={"Description"}
              name={"description"}
              onChange={updateField}
            />
            <InputWithLabel
              type="number"
              defaultValue={newProduct.price}
              label={"Price"}
              name={"price"}
              onChange={updateField}
            />
          </div>
          {create ? (
            <MyButton
              variant="outline-success"
              onClick={() => {
                const data = formatDataForSubmittion();
                createProductFetch({ data: data }).then((res) =>
                  navigate("/admin/products", { replace: true })
                );
              }}
            >
              Create New Product{" "}
            </MyButton>
          ) : (
            <MyButton
              variant="outline-success"
              onClick={() => {
                const data = formatDataForSubmittion();

                updateProductFetch({ data: data }).then((res) =>
                  navigate("/admin/products", { replace: true })
                );
              }}
            >
              update Product
            </MyButton>
          )}
          {createProductValues.loading || updateProductValues.loading ? (
            <Center>
              <span>loading ...</span>
            </Center>
          ) : (
            /* old images */
            (
              <>
                {!create && product?.images.length !== 0 && (
                  <div
                    style={{ minHeight: "400px" }}
                    className="my-3 p-3 border"
                  >
                    <h3>Images</h3>
                    <Row xxl={4} xl={3} md={2} xs={1} className="g-4 my-3 ">
                      {product?.images.map((imgSrc) => (
                        <Col
                          key={imgSrc.uuid}
                          className="d-flex justify-content-center"
                        >
                          <ImageContainer
                            imgSrc={`${BASE_URL}${imgSrc.url}`}
                            onDelete={() =>
                              deleteOldImage(imgSrc.uuid).then((res) =>
                                refresh()
                              )
                            }
                          />
                        </Col>
                      ))}
                    </Row>
                  </div>
                )}
                <div style={{ minHeight: "400px" }} className="my-3 p-3 border">
                  {/* upload images button */}
                  <MyButton
                    onClick={() => uploadImagesInputRef.current.click()}
                    variant="outline-info"
                  >
                    upload images
                  </MyButton>
                  <input
                    type="file"
                    multiple={true}
                    onChange={(e) =>
                      setNewImages((old) => [...old, ...e.target.files])
                    }
                    hidden
                    ref={uploadImagesInputRef}
                    accept="image/*"
                  />

                  <Row xxl={4} xl={3} md={2} xs={1} className="g-4 my-3 ">
                    {showImages() ? (
                      imagesPreviews.map((preview, i) => {
                        return (
                          <Col
                          key={`image-prev-${i}`}

                           className="d-flex justify-content-center">
                            <ImageContainer
                              onDelete={() => {
                                deleteImage(i);
                              }}
                              imgSrc={preview}
                            />
                          </Col>
                        );
                      })
                    ) : (
                      <Center>
                        <span>no images</span>
                      </Center>
                    )}
                  </Row>
                </div>
              </>
            )
          )}
        </>
      </LoadingComponent>
    </AdminRequired>
  );
}
