// src/modules/pos/cari/components/CariModal.jsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../inventory/inventory.css"; // aynı CSS yapısını kullanalım

const CariSchema = Yup.object().shape({
  code: Yup.string().required("Cari Kodu zorunludur"),
  name: Yup.string().required("Cari Ünvan zorunludur"),
  group: Yup.string().required("Cari Grubu zorunludur"),
  taxNumber: Yup.string().required("Vergi No zorunludur"),
  city: Yup.string().required("Şehir zorunludur"),
});

const CariModal = ({ open, onClose, onSave, editItem }) => {
  const [activeTab, setActiveTab] = useState("general");

  if (!open) return null;

  const initialValues = editItem || {
    code: "",
    name: "",
    group: "",
    description: "",
    address: "",
    address2: "",
    city: "",
    phone1: "",
    phone2: "",
    fax: "",
    email: "",
    website: "",
    taxOffice: "",
    taxNumber: "",
    notes: "",
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box large">
        <h3>📘 Cari Hesap Kartı</h3>

        {/* Sekmeler */}
        <div className="tab-header">
          <button
            className={activeTab === "general" ? "active" : ""}
            onClick={() => setActiveTab("general")}
          >
            Genel Bilgiler
          </button>
          <button
            className={activeTab === "contact" ? "active" : ""}
            onClick={() => setActiveTab("contact")}
          >
            İletişim Bilgisi
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
          validationSchema={CariSchema}
          onSubmit={(values) => {
            onSave?.(values);
            onClose?.();
          }}
        >
          {() => (
            <Form className="form-two-column">
              {/* === GENEL BİLGİLER === */}
              {activeTab === "general" && (
                <>
                  <div className="form-col">
                    <label>Cari Kodu</label>
                    <Field name="code" className="form-input" />
                    <ErrorMessage name="code" component="div" className="form-error" />

                    <label>Cari Ünvan</label>
                    <Field name="name" className="form-input" />
                    <ErrorMessage name="name" component="div" className="form-error" />

                    <label>Cari Grubu</label>
                    <Field name="group" className="form-input" />
                    <ErrorMessage name="group" component="div" className="form-error" />

                    <label>Açıklama</label>
                    <Field name="description" className="form-input" />

                    <label>Adres</label>
                    <Field as="textarea" name="address" rows="2" className="form-input" />

                    <label>Adres Devamı</label>
                    <Field name="address2" className="form-input" />
                  </div>

                  <div className="form-col">
                    <label>Şehir</label>
                    <Field name="city" className="form-input" />
                    <ErrorMessage name="city" component="div" className="form-error" />

                    <label>Telefon 1</label>
                    <Field name="phone1" className="form-input" />

                    <label>Telefon 2</label>
                    <Field name="phone2" className="form-input" />

                    <label>Vergi Dairesi</label>
                    <Field name="taxOffice" className="form-input" />

                    <label>Vergi No</label>
                    <Field name="taxNumber" className="form-input" />
                    <ErrorMessage name="taxNumber" component="div" className="form-error" />
                  </div>
                </>
              )}

              {/* === İLETİŞİM BİLGİSİ === */}
              {activeTab === "contact" && (
                <>
                  <div className="form-col">
                    <label>Telefon 1</label>
                    <Field name="phone1" className="form-input" />
                    <label>Telefon 2</label>
                    <Field name="phone2" className="form-input" />
                    <label>Faks</label>
                    <Field name="fax" className="form-input" />
                  </div>

                  <div className="form-col">
                    <label>E-posta</label>
                    <Field name="email" type="email" className="form-input" />
                    <label>Web Sitesi</label>
                    <Field name="website" className="form-input" />
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
                    className="form-input"
                    rows="6"
                    placeholder="Cari ile ilgili notlar..."
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

export default CariModal;