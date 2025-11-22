import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ProductsPage.css";

const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Ürün adı zorunludur"),
  barcode: Yup.string().min(6, "En az 6 hane olmalı").required("Barkod zorunludur"),
  costPrice: Yup.number().positive("Pozitif olmalı").required("Alış fiyatı zorunludur"),
  price: Yup.number().positive("Pozitif olmalı").required("Satış fiyatı zorunludur"),
  vatRate: Yup.number().min(0).max(1).required("KDV oranı zorunludur"),
  stock: Yup.number().integer().min(0).required("Stok zorunludur"),
});

const ProductModal = ({ open, onClose, onSave, editItem }) => {
  if (!open) return null;

  const generateBarcode = () =>
    "869" + Math.floor(1000000000 + Math.random() * 9000000000);

  return (
    <div className="modal-overlay">
      <div className="modal-box large">
        <h3>{editItem ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h3>

        <Formik
          enableReinitialize
          validationSchema={ProductSchema}
          initialValues={
            editItem || {
              name: "",
              barcode: generateBarcode(),
              category: "",
              brand: "",
              unit: "adet",
              costPrice: "",
              price: "",
              vatRate: 0.18,
              discount: 0,
              stock: 0,
              isBestSeller: false,
              image: "",
            }
          }
          onSubmit={(values, { resetForm }) => {
            const payload = {
              ...values,
              id: editItem?.id || Date.now(),
              costPrice: parseFloat(values.costPrice),
              price: parseFloat(values.price),
              vatRate: parseFloat(values.vatRate),
              discount: parseFloat(values.discount),
              stock: parseInt(values.stock),
              createdAt: editItem?.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            onSave(payload);
            resetForm();
            onClose();
          }}
        >
          {({ setFieldValue, values }) => {
            const handleImageUpload = (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => setFieldValue("image", ev.target.result);
              reader.readAsDataURL(file);
            };

            return (
              <Form className="form-two-column">
                {/* === SOL BLOK === */}
                <div className="form-col">
                  <label>Ürün Adı</label>
                  <Field name="name" className="form-input" />
                  <ErrorMessage name="name" component="div" className="form-error" />

                  <label>Barkod</label>
                  <div className="barcode-row">
                    <Field name="barcode" className="form-input" />
                    <button
                      type="button"
                      className="btn gray small"
                      onClick={() => setFieldValue("barcode", generateBarcode())}
                    >
                      Oluştur
                    </button>
                  </div>
                  <ErrorMessage name="barcode" component="div" className="form-error" />

                  <label>Kategori</label>
                  <Field name="category" className="form-input" />

                  <label>Marka</label>
                  <Field name="brand" className="form-input" />

                  <label>Birim</label>
                  <Field as="select" name="unit" className="form-input">
                    <option value="adet">Adet</option>
                    <option value="paket">Paket</option>
                    <option value="kg">Kg</option>
                    <option value="litre">Litre</option>
                  </Field>

                  <label>Alış Fiyatı (₺)</label>
                  <Field name="costPrice" type="number" className="form-input" />

                  <label>Satış Fiyatı (₺)</label>
                  <Field name="price" type="number" className="form-input" />
                </div>

                {/* === SAĞ BLOK === */}
                <div className="form-col">
                  <label>KDV Oranı (0.18 = %18)</label>
                  <Field name="vatRate" type="number" step="0.01" className="form-input" />

                  <label>İndirim (₺)</label>
                  <Field name="discount" type="number" className="form-input" />

                  <label>Stok Miktarı</label>
                  <Field name="stock" type="number" className="form-input" />

                  <div className="checkbox-row">
                    <label>
                      <Field type="checkbox" name="isBestSeller" /> Çok Satan Ürün
                    </label>
                  </div>

                  <label>Ürün Görseli</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                  {values.image && (
                    <img src={values.image} alt="preview" className="preview-img" />
                  )}
                </div>

                {/* === BUTONLAR === */}
                <div className="form-actions two-column">
                  <button type="button" className="btn gray" onClick={onClose}>
                    İptal
                  </button>
                  <button type="submit" className="btn green">
                    Kaydet
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ProductModal;