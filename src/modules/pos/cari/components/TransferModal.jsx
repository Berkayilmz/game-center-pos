// src/modules/pos/cari/components/TransferModal.jsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../inventory/inventory.css";

const TransferSchema = Yup.object().shape({
  date: Yup.string().required("Tarih zorunludur"),
  docNo: Yup.string().required("Evrak numarası zorunludur"),
  amount: Yup.number().min(0.01, "Tutar sıfırdan büyük olmalıdır").required("Tutar zorunludur"),
  fromAccount: Yup.string().required("Borçlu hesap seçilmelidir"),
  toAccount: Yup.string()
    .required("Alacaklı hesap seçilmelidir")
    .notOneOf([Yup.ref("fromAccount")], "Aynı hesaplar arasında virman yapılamaz"),
});

const TransferModal = ({ open, onClose, onSave, editItem }) => {
  const [activeTab, setActiveTab] = useState("info");
  if (!open) return null;

  const initialValues = editItem || {
    date: new Date().toISOString().slice(0, 10),
    docNo: `VIR-${Date.now().toString().slice(-4)}`,
    dueDate: "",
    amount: "",
    description: "",
    fromAccount: "",
    toAccount: "",
    notes: "",
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box large">
        <h3>🔁 Cari Virman</h3>

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
          validationSchema={TransferSchema}
          onSubmit={(values) => {
            onSave?.(values);
            onClose?.();
          }}
        >
          {() => (
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
                    <label>Borçlu Hesap</label>
                    <Field
                      name="fromAccount"
                      className="form-input"
                      placeholder="Borçlu cari hesabı seçiniz"
                    />
                    <ErrorMessage name="fromAccount" component="div" className="form-error" />

                    <label>Alacaklı Hesap</label>
                    <Field
                      name="toAccount"
                      className="form-input"
                      placeholder="Alacaklı cari hesabı seçiniz"
                    />
                    <ErrorMessage name="toAccount" component="div" className="form-error" />
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
                    placeholder="Bu virman işlemiyle ilgili notlar..."
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

export default TransferModal;