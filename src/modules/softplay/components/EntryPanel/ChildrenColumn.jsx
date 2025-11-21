import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "../../../../core/components/Modal/Modal";
import {
  addChild,
  updateChild,
  deleteChild,
} from "../../../../redux/slices/sofplaySlice";
import "./EntryPanel.css";

const ChildrenColumn = ({ selectedChild, setSelectedChild }) => {
  const dispatch = useDispatch();
  const { children, families } = useSelector((state) => state.softplay);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const ChildSchema = Yup.object().shape({
    name: Yup.string().required("İsim zorunludur"),
    age: Yup.number().nullable().min(0).max(15),
    parent: Yup.string().required("Veli seçimi zorunludur"),
  });

  const handleAdd = (values, { resetForm }) => {
    dispatch(addChild({ id: Date.now(), isSoftplay: false, ...values }));
    resetForm();
    setModalOpen(false);
  };

  const handleEdit = (values, { resetForm }) => {
    if (!selectedChild) return;
    dispatch(updateChild({ id: selectedChild.id, updates: values }));
    setSelectedChild(null);
    setEditMode(false);
    setModalOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (!selectedChild) return;
    dispatch(deleteChild(selectedChild.id));
    setSelectedChild(null);
  };

  return (
    <div className="entry-column">
      <h3>ÇOCUKLAR</h3>

      <div className="children-list">
        {children.map((child) => (
          <div
            key={child.id}
            className={`child-item ${
              selectedChild?.id === child.id ? "active" : ""
            }`}
            onClick={() =>
              setSelectedChild(selectedChild?.id === child.id ? null : child)
            }
          >
            <strong>{child.name} ({child.age})</strong>
            <div className="child-subinfo">👨‍👩‍👧 {child.parent}</div>
          </div>
        ))}
      </div>

      <div className="children-actions">
        <button className="icon-btn" disabled={!selectedChild} onClick={handleDelete}>
          🗑️ Sil
        </button>
        <button
          className="icon-btn"
          disabled={!selectedChild}
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

      {/* Modal */}
      <Modal
        open={modalOpen}
        title={editMode ? "Çocuk Düzenle" : "Yeni Çocuk Ekle"}
        onClose={() => setModalOpen(false)}
      >
        <Formik
          enableReinitialize
          initialValues={
            editMode && selectedChild
              ? {
                  name: selectedChild.name,
                  age: selectedChild.age || "",
                  parent: selectedChild.parent,
                }
              : { name: "", age: "", parent: "" }
          }
          validationSchema={ChildSchema}
          onSubmit={editMode ? handleEdit : handleAdd}
        >
          {() => (
            <Form className="family-form">
              <label>Ad Soyad</label>
              <Field name="name" className="form-input" placeholder="Örn: Elif Arslan" />
              <ErrorMessage name="name" component="div" className="form-error" />

              <label>Yaş</label>
              <Field name="age" type="number" className="form-input" placeholder="Opsiyonel" />
              <ErrorMessage name="age" component="div" className="form-error" />

              <label>Veli</label>
              <Field as="select" name="parent" className="form-input">
                <option value="">Seçiniz</option>
                {families.map((f) => (
                  <option key={f.id} value={f.name}>
                    {f.name} ({f.role})
                  </option>
                ))}
              </Field>
              <ErrorMessage name="parent" component="div" className="form-error" />

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

export default ChildrenColumn;