// src/modules/pos/card/components/CardModal.jsx
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CardModal = ({ open, onClose, onSave, editCard }) => {
  if (!open) return null;

  // 🧩 Başlangıç değerleri
  const initialValues = editCard || {
    cardId: "",
    type: "customer",
    balance: 0,
    serviceCount: 0,
    guestBalance: 0,
    maxBalance: "",
    serviceLimit: "",
    autoLoad: false,
    isActive: true,
    specialSales: [], // ✅ eklendi
  };

  // ✅ Yup doğrulama şeması
  const validationSchema = Yup.object().shape({
    cardId: Yup.string()
      .required("Kart ID zorunludur")
      .min(4, "Kart ID en az 4 karakter olmalı"),
    type: Yup.string().oneOf(["customer", "service"]).required("Kart tipi zorunludur"),
    balance: Yup.number()
      .min(0, "Negatif olamaz")
      .required("Bakiyeyi giriniz"),
    serviceCount: Yup.number()
      .min(0, "Negatif olamaz")
      .when("type", {
        is: "service",
        then: (schema) => schema.required("Servis adedi zorunlu"),
      }),
    guestBalance: Yup.number().min(0, "Negatif olamaz"),
    maxBalance: Yup.number().min(0, "0'dan küçük olamaz").nullable(),
    serviceLimit: Yup.number().min(0, "0'dan küçük olamaz").nullable(),
    autoLoad: Yup.boolean(),
    isActive: Yup.boolean(),
  });

  const handleSubmit = (values) => {
    onSave(values);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{editCard ? "Kart Düzenle" : "Yeni Kart Ekle"}</h3>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form className="modal-body">
              <label>Kart ID</label>
              <Field name="cardId" placeholder="Örn: FACR-1009" />
              <ErrorMessage name="cardId" component="div" className="error" />

              <label>Kart Türü</label>
              <Field
                as="select"
                name="type"
                onChange={(e) => setFieldValue("type", e.target.value)}
              >
                <option value="customer">Müşteri Kartı</option>
                <option value="service">Servis Kartı</option>
              </Field>
              <ErrorMessage name="type" component="div" className="error" />

              <label>Başlangıç Bakiyesi</label>
              <Field type="number" name="balance" />
              <ErrorMessage name="balance" component="div" className="error" />

              {/* 🔹 Servis tipi ise servis adedi alanı göster */}
              {values.type === "service" && (
                <>
                  <label>Servis Adedi</label>
                  <Field type="number" name="serviceCount" />
                  <ErrorMessage name="serviceCount" component="div" className="error" />
                </>
              )}

              <label>Misafir Bakiyesi</label>
              <Field type="number" name="guestBalance" />
              <ErrorMessage name="guestBalance" component="div" className="error" />

              <label>Maksimum Bakiye Limiti</label>
              <Field type="number" name="maxBalance" placeholder="Opsiyonel" />
              <ErrorMessage name="maxBalance" component="div" className="error" />

              <label>Servis Kullanım Limiti</label>
              <Field type="number" name="serviceLimit" placeholder="Opsiyonel" />
              <ErrorMessage name="serviceLimit" component="div" className="error" />

              <div className="modal-checkboxes">
                <label>
                  <Field type="checkbox" name="autoLoad" />
                  Otomatik Yükleme
                </label>
                <label>
                  <Field type="checkbox" name="isActive" />
                  POS'ta Aktif
                </label>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn green">
                  Kaydet
                </button>
                <button
                  type="button"
                  className="btn gray"
                  onClick={onClose}
                >
                  İptal
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CardModal;