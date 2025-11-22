import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../inventory.css";

// 📏 Validasyon şeması
// 📏 Validasyon şeması
const ProductSchema = Yup.object().shape({
    name: Yup.string().required("Ürün adı zorunludur"),
    barcode: Yup.string().required("Barkod zorunludur"),
    costPrice: Yup.number()
      .typeError("Alış fiyatı sayısal olmalı")
      .moreThan(0, "Alış fiyatı 0'dan büyük olmalı")
      .required("Alış fiyatı zorunludur"),
    price: Yup.number()
      .typeError("Satış fiyatı sayısal olmalı")
      .moreThan(0, "Satış fiyatı 0'dan büyük olmalı")
      .required("Satış fiyatı zorunludur"),
  });

const ProductModal = ({ open, onClose, onSave, editItem }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [preview, setPreview] = useState(editItem?.image || null);

  if (!open) return null;

  const initialValues = editItem || {
    code: "",
    name: "",
    group: "",
    barcode: "",
    producerCode: "",
    producer: "",
    type: "",
    brand: "",
    model: "",
    unit: "",
    vatRate: 18,
    vatIncluded: false,
    costPrice: 0,
    price: 0,
    quickSalePrice: 0,
    price1: 0,
    price2: 0,
    price3: 0,
    special1: "",
    special2: "",
    special3: "",
    weight: "",
    shelf: "",
    eye: "",
    minQty: "",
    maxQty: "",
    notes: "",
    image: "",
  };

  const handleImageUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setFieldValue("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const generateBarcode = (setFieldValue) => {
    const random = Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
    setFieldValue("barcode", random);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box large">
        <h3>Ürün Kartı</h3>

        <div className="tab-header">
          <button
            className={activeTab === "general" ? "active" : ""}
            onClick={() => setActiveTab("general")}
          >
            Genel Bilgiler
          </button>
          <button
            className={activeTab === "details" ? "active" : ""}
            onClick={() => setActiveTab("details")}
          >
            Diğer Bilgiler
          </button>
          <button
            className={activeTab === "image" ? "active" : ""}
            onClick={() => setActiveTab("image")}
          >
            Ürün Resmi
          </button>
          <button
            className={activeTab === "notes" ? "active" : ""}
            onClick={() => setActiveTab("notes")}
          >
            Notlar
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={ProductSchema}
          onSubmit={(values) => {
            onSave(values);
            onClose();
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="form-two-column">
              {activeTab === "general" && (
                <>
                  <div className="form-col">
                    <label>Ürün Kodu</label>
                    <Field name="code" className="form-input" />

                    <label>Ürün Adı *</label>
                    <Field name="name" className="form-input" />
                    <ErrorMessage name="name" component="div" className="form-error" />

                    <label>Ürün Grubu</label>
                    <Field name="group" className="form-input" />

                    <label>Barkod Kodu *</label>
                    <div className="form-row">
                      <Field name="barcode" className="form-input" style={{ flex: 1 }} />
                      <button
                        type="button"
                        className="btn blue small"
                        style={{ marginLeft: "6px" }}
                        onClick={() => generateBarcode(setFieldValue)}
                      >
                        Oluştur
                      </button>
                    </div>
                    <ErrorMessage name="barcode" component="div" className="form-error" />

                    <label>Üretici</label>
                    <Field name="producer" className="form-input" />

                    <label>Marka</label>
                    <Field name="brand" className="form-input" />

                    <label>Birim *</label>
                    <Field as="select" name="unit" className="form-input">
                      <option value="">Seçiniz</option>
                      <option value="Adet">Adet</option>
                      <option value="Kg">Kg</option>
                      <option value="Koli">Koli</option>
                      <option value="Litre">Litre</option>
                    </Field>
                    <ErrorMessage name="unit" component="div" className="form-error" />

                    <label>KDV %</label>
                    <Field name="vatRate" type="number" className="form-input" />
                  </div>

                  <div className="form-col">
                    <label>Alış Fiyatı (₺) *</label>
                    <Field name="costPrice" type="number" className="form-input" />
                    <ErrorMessage name="costPrice" component="div" className="form-error" />

                    <label>Satış Fiyatı (₺) *</label>
                    <Field name="price" type="number" className="form-input" />
                    <ErrorMessage name="price" component="div" className="form-error" />

                    <label>Hızlı Satış Fiyatı</label>
                    <Field name="quickSalePrice" type="number" className="form-input" />

                    <label>Fiyat 1</label>
                    <Field name="price1" type="number" className="form-input" />

                    <label>Fiyat 2</label>
                    <Field name="price2" type="number" className="form-input" />

                    <label>Fiyat 3</label>
                    <Field name="price3" type="number" className="form-input" />
                  </div>
                </>
              )}

              {activeTab === "details" && (
                <>
                  <div className="form-col">
                    <label>Özel Alan 1</label>
                    <Field name="special1" className="form-input" />
                    <label>Özel Alan 2</label>
                    <Field name="special2" className="form-input" />
                    <label>Özel Alan 3</label>
                    <Field name="special3" className="form-input" />
                    <label>Ağırlık</label>
                    <Field name="weight" className="form-input" />
                  </div>
                  <div className="form-col">
                    <label>Raf</label>
                    <Field name="shelf" className="form-input" />
                    <label>Göz</label>
                    <Field name="eye" className="form-input" />
                    <label>Minimum Miktar</label>
                    <Field name="minQty" className="form-input" />
                    <label>Maksimum Miktar</label>
                    <Field name="maxQty" className="form-input" />
                  </div>
                </>
              )}

              {activeTab === "image" && (
                <div className="form-col full-width">
                  <label>Ürün Görseli</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setFieldValue)}
                  />
                  {preview && (
                    <img src={preview} alt="preview" className="preview-img" />
                  )}
                </div>
              )}

              {activeTab === "notes" && (
                <div className="form-col full-width">
                  <label>Notlar</label>
                  <Field
                    as="textarea"
                    name="notes"
                    className="form-input"
                    rows="6"
                    placeholder="Ürünle ilgili açıklamalar..."
                  />
                </div>
              )}

              <div className="form-actions two-column">
                <button type="button" className="btn gray" onClick={onClose}>
                  İptal
                </button>
                <button type="submit" className="btn green">
                  Kaydet
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductModal;