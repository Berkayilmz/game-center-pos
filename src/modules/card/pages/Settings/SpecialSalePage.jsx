// src/modules/pos/card/pages/SpecialSalesPage.jsx
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../CardPage.css";

const STORAGE_KEY = "special_sales";

// 📜 Validasyon Şeması
const SaleSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ad en az 2 karakter olmalı")
    .max(50, "Ad en fazla 50 karakter olabilir")
    .required("Ad zorunludur"),
  credit: Yup.number()
    .typeError("Kredi sayısal olmalı")
    .positive("Kredi pozitif olmalı")
    .required("Kredi zorunludur"),
  price: Yup.number()
    .typeError("Tutar sayısal olmalı")
    .positive("Tutar pozitif olmalı")
    .required("Tutar zorunludur"),
});

const SpecialSalesPage = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) setSales(JSON.parse(data));
  }, []);

  const saveData = (list) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setSales(list);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Silmek istediğine emin misin?")) return;
    saveData(sales.filter((s) => s.id !== id));
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>🎯 Özel Satış Tanımları</h2>
      </div>

      {/* 🧾 Formik Form */}
      <Formik
        initialValues={{ name: "", credit: "", price: "" }}
        validationSchema={SaleSchema}
        onSubmit={(values, { resetForm }) => {
          const newItem = {
            id: Date.now(),
            name: values.name.trim(),
            credit: Number(values.credit),
            price: parseFloat(values.price),
          };
          const updated = [...sales, newItem];
          saveData(updated);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="filter-bar" style={{ gap: "10px", alignItems: "flex-start" }}>
            <div className="form-group">
              <Field name="name" placeholder="Ad" className="form-input" />
              <ErrorMessage name="name" component="div" className="error-text" />
            </div>
            <div className="form-group">
              <Field
                name="credit"
                type="number"
                placeholder="Kredi"
                className="form-input"
              />
              <ErrorMessage name="credit" component="div" className="error-text" />
            </div>
            <div className="form-group">
              <Field
                name="price"
                type="number"
                placeholder="Tutar (₺)"
                className="form-input"
              />
              <ErrorMessage name="price" component="div" className="error-text" />
            </div>
            <button
              type="submit"
              className="btn green"
              disabled={isSubmitting}
            >
              + Ekle
            </button>
          </Form>
        )}
      </Formik>

      {/* 📋 Tablo */}
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Ad</th>
              <th>Kredi</th>
              <th>Tutar (₺)</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-msg">
                  Henüz özel satış tanımı yok.
                </td>
              </tr>
            ) : (
              sales.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.credit}</td>
                  <td>{s.price.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn red small"
                      onClick={() => handleDelete(s.id)}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecialSalesPage;