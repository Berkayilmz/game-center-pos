// src/modules/pos/cari/components/DebtVoucherModal.jsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../inventory/inventory.css";

const DebtVoucherSchema = Yup.object().shape({
  date: Yup.string().required("Tarih zorunludur"),
  docNo: Yup.string().required("Evrak No zorunludur"),
  amount: Yup.number().min(0.01, "Tutar 0 olamaz").required("İşlem tutarı zorunludur"),
  account: Yup.string().required("Cari hesap seçilmelidir"),
});

const DebtVoucherModal = ({ open, onClose, onSave, editItem }) => {
  const [activeTab, setActiveTab] = useState("info");

  if (!open) return null;

  const initialValues = editItem || {
    date: new Date().toISOString().slice(0, 10),
    docNo: `BD-${Date.now().toString().slice(-4)}`,
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
        <h3>📘 Borç Dekontu</h3>

        {/* Sekmeler */}
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
          validationSchema={DebtVoucherSchema}
          onSubmit={(values) => {
            const balance = (Number(values.debt) + Number(values.amount)) - Number(values.credit);
            const final = { ...values, balance };
            onSave?.(final);
            onClose?.();
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="form-two-column">
              {/* === CARİ İŞLEM BİLGİSİ === */}
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
                      <Field
                        name="debt"
                        type="number"
                        className="form-input"
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setFieldValue("debt", val);
                          setFieldValue("balance", val - (values.credit || 0));
                        }}
                      />
                    </div>

                    <div className="form-row">
                      <label>Alacak</label>
                      <Field
                        name="credit"
                        type="number"
                        className="form-input"
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setFieldValue("credit", val);
                          setFieldValue("balance", (values.debt || 0) - val);
                        }}
                      />
                    </div>

                    <div className="form-row">
                      <label>Bakiye</label>
                      <Field name="balance" type="number" className="form-input" readOnly />
                    </div>
                  </div>
                </>
              )}

              {/* === NOTLAR === */}
              {activeTab === "notes" && (
                <div className="form-col full-width">
                  <label>Notlar</label>
                  <Field
                    as="textarea"
                    name="notes"
                    rows="6"
                    className="form-input"
                    placeholder="Borç dekontuna ait notlar..."
                  />
                </div>
              )}

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
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DebtVoucherModal;