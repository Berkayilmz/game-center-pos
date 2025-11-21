// src/features/softplay/pages/DurationSettingsPage.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDuration,
  updateDuration,
  deleteDuration,
} from "../../../../../redux/slices/sofplaySlice";
import Modal from "../../../../../core/components/Modal/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./DurationSettingsPage.css"; // 💡 aynı görünüm için doğrudan bu css kullanılıyor

const DurationSettingsPage = () => {
  const dispatch = useDispatch();
  const { durations } = useSelector((s) => s.softplay);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const DurationSchema = Yup.object().shape({
    label: Yup.string().required("Etiket zorunludur"),
    value: Yup.number().min(10).required("Dakika değeri zorunludur"),
    price: Yup.number().min(1).required("Fiyat zorunludur"),
  });

  const filteredDurations = durations.filter((d) =>
    d.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (values, { resetForm }) => {
    if (editItem) {
      dispatch(updateDuration({ id: editItem.id, updates: values }));
    } else {
      dispatch(addDuration({ id: Date.now(), ...values }));
    }
    resetForm();
    setOpenModal(false);
    setEditItem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bu süre tarifesi silinsin mi?")) {
      dispatch(deleteDuration(id));
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>⏱️ Süre Tarifeleri</h2>
        <button
          className="btn green"
          onClick={() => {
            setEditItem(null);
            setOpenModal(true);
          }}
        >
          + Yeni Süre
        </button>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Süre etiketi ara (örn: 1 SAAT)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-container">
        {filteredDurations.length === 0 ? (
          <div className="empty-msg">Kayıtlı süre bulunamadı.</div>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>Etiket</th>
                <th>Süre (dk)</th>
                <th>Ücret (₺)</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredDurations.map((d) => (
                <tr key={d.id}>
                  <td>{d.label}</td>
                  <td>{d.value}</td>
                  <td>{d.price}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn gray small"
                        onClick={() => {
                          setEditItem(d);
                          setOpenModal(true);
                        }}
                      >
                        Düzenle
                      </button>
                      <button
                        className="btn red small"
                        onClick={() => handleDelete(d.id)}
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {openModal && (
        <Modal
          open={openModal}
          title={editItem ? "Süre Düzenle" : "Yeni Süre Ekle"}
          onClose={() => {
            setOpenModal(false);
            setEditItem(null);
          }}
        >
          <Formik
            enableReinitialize
            initialValues={
              editItem
                ? {
                    label: editItem.label,
                    value: editItem.value,
                    price: editItem.price,
                  }
                : { label: "", value: "", price: "" }
            }
            validationSchema={DurationSchema}
            onSubmit={handleSave}
          >
            {() => (
              <Form className="family-form">
                <label>Etiket</label>
                <Field
                  name="label"
                  className="form-input"
                  placeholder="Örn: 1 Saat"
                />
                <ErrorMessage name="label" component="div" className="form-error" />

                <label>Süre (dk)</label>
                <Field
                  name="value"
                  type="number"
                  className="form-input"
                  placeholder="Dakika"
                />
                <ErrorMessage name="value" component="div" className="form-error" />

                <label>Ücret (₺)</label>
                <Field
                  name="price"
                  type="number"
                  className="form-input"
                  placeholder="Ücret"
                />
                <ErrorMessage name="price" component="div" className="form-error" />

                <div className="form-actions two-column">
                  <button type="submit" className="btn green small">
                    {editItem ? "Güncelle" : "Kaydet"}
                  </button>
                  <button
                    type="button"
                    className="btn gray small"
                    onClick={() => setOpenModal(false)}
                  >
                    İptal
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </div>
  );
};

export default DurationSettingsPage;