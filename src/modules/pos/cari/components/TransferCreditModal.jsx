// src/modules/pos/cari/components/TransferCreditModal.jsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../inventory/inventory.css";

const TransferCreditSchema = Yup.object().shape({
  date: Yup.string().required("Tarih zorunludur"),
  docNo: Yup.string().required("Evrak numarası zorunludur"),
  amount: Yup.number().min(0.01, "Tutar sıfırdan büyük olmalıdır").required("Tutar zorunludur"),
  account: Yup.string().required("Cari hesap zorunludur"),
});

const TransferCreditModal = ({ open, onClose, onSave, editItem }) => {
  const [activeTab, setActiveTab] = useState("info");
  if (!open) return null;

  const initialValues = editItem || {
    date: new Date().toISOString().slice(0, 10),
    docNo: `DEVA-${Date.now().toString().slice(-4)}`,
    dueDate: "",
    amount: "",
    description: "",
    account: "",
    debt: 0,
    credit: 0,
    balance: 0,
    notes: "",
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box large">
        <h3>📗 Devir Alacak</h3>

        <div className="tab-header">
          <button
            className={activeTab === "info" ? "active" : ""}
            onClick={() => setActiveTab("info")}
          >
            Cari İşlem Bilgisi
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
          validationSchema={TransferCreditSchema}
          onSubmit={(values) => {
            const balance = (values.credit || values.amount) - (values.debt || 0);
            const final = {
              ...values,
              credit: values.amount,
              balance,
            };
            onSave?.(final);
            onClose?.();
          }}
        >
          {({ values }) => (
            <Form className="form-two-column">
              {activeTab === "info" && (
                <>
                  <div className="form-col">
                    <label>Tarih</label>
                    <Field name="date" type="date" className="form-input" />

                    <label>Evrak No</label>
                    <Field name="docNo" className="form-input" />

                    <label>Vade Tarihi</label>
                    <Field name="dueDate" type="date" className="form-input" />

                    <label>İşlem Tutarı (₺)</label>
                    <Field name="amount" type="number" className="form-input" />
                    <ErrorMessage name="amount" component="div" className="form-error" />

                    <label>Açıklama</label>
                    <Field name="description" className="form-input" />
                  </div>

                  <div className="form-col">
                    <label>Cari Hesap</label>
                    <Field
                      name="account"
                      className="form-input"
                      placeholder="Cari hesap seçiniz"
                    />
                    <ErrorMessage name="account" component="div" className="form-error" />

                    <div className="form-row" style={{ marginTop: "10px" }}>
                      <label>Borç</label>
                      <Field name="debt" type="number" className="form-input" readOnly />
                    </div>

                    <div className="form-row">
                      <label>Alacak</label>
                      <Field name="credit" type="number" className="form-input" readOnly />
                    </div>

                    <div className="form-row">
                      <label>Bakiye</label>
                      <Field name="balance" type="number" className="form-input" readOnly />
                    </div>
                  </div>
                </>
              )}

              {activeTab === "notes" && (
                <div className="form-col full-width">
                  <label>Notlar</label>
                  <Field
                    as="textarea"
                    name="notes"
                    rows="6"
                    className="form-input"
                    placeholder="Bu devir alacağı ile ilgili notlar..."
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

export default TransferCreditModal;