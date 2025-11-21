import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "../../../../core/components/Modal/Modal";
import {
  addFamily,
  updateFamily,
  deleteFamily,
} from "../../../../redux/slices/sofplaySlice";
import "./EntryPanel.css";

const FamilyColumn = () => {
  const dispatch = useDispatch();
  const families = useSelector((state) => state.softplay.families);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const FamilySchema = Yup.object().shape({
    name: Yup.string().required("İsim zorunludur"),
    role: Yup.string().required("Rol zorunludur"),
    phone: Yup.string()
      .matches(/^0\d{10}$/, "Geçerli bir telefon girin (ör: 05xxxxxxxxx)")
      .required("Telefon zorunludur"),
  });

  const handleAdd = (values, { resetForm }) => {
    dispatch(addFamily({ id: Date.now(), ...values }));
    resetForm();
    setModalOpen(false);
  };

  const handleEdit = (values, { resetForm }) => {
    if (!selectedFamily) return;
    dispatch(updateFamily({ id: selectedFamily.id, updates: values }));
    setSelectedFamily(null);
    setEditMode(false);
    setModalOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (!selectedFamily) return;
    dispatch(deleteFamily(selectedFamily.id));
    setSelectedFamily(null);
  };

  return (
    <div className="entry-column">
      <h3>AİLE</h3>

      <div className="scrollable">
        {families.map((person) => (
          <div
            key={person.id}
            className={`family-card ${selectedFamily?.id === person.id ? "active" : ""}`}
            onClick={() =>
              setSelectedFamily(selectedFamily?.id === person.id ? null : person)
            }
          >
            <div>
              <strong>{person.name}</strong>
              <div className="family-info">
                {person.role} • {person.phone}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="children-actions">
        <button className="icon-btn" disabled={!selectedFamily} onClick={handleDelete}>
          🗑️ Sil
        </button>
        <button
          className="icon-btn"
          disabled={!selectedFamily}
          onClick={() => {
            setEditMode(true);
            setModalOpen(true);
          }}
        >
          ⚙️ Düzenle
        </button>
      </div>

      <button
        className="add-btn"
        onClick={() => {
          setEditMode(false);
          setModalOpen(true);
        }}
      >
        ＋ Ekle
      </button>

      <Modal
        open={modalOpen}
        title={editMode ? "Veli Düzenle" : "Yeni Veli Ekle"}
        onClose={() => setModalOpen(false)}
      >
        <Formik
          enableReinitialize
          initialValues={
            editMode && selectedFamily
              ? selectedFamily
              : { name: "", role: "", phone: "" }
          }
          validationSchema={FamilySchema}
          onSubmit={editMode ? handleEdit : handleAdd}
        >
          {() => (
            <Form className="family-form">
              <label>İsim Soyisim</label>
              <Field name="name" className="form-input" />
              <ErrorMessage name="name" component="div" className="form-error" />

              <label>Rol</label>
              <Field as="select" name="role" className="form-input">
                <option value="">Seçiniz</option>
                <option value="BABA">Baba</option>
                <option value="ANNE">Anne</option>
                <option value="DİĞER">Diğer</option>
              </Field>
              <ErrorMessage name="role" component="div" className="form-error" />

              <label>Telefon</label>
              <Field name="phone" className="form-input" />
              <ErrorMessage name="phone" component="div" className="form-error" />

              <button type="submit" className="submit-btn">
                {editMode ? "Güncelle" : "Kaydet"}
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default FamilyColumn;