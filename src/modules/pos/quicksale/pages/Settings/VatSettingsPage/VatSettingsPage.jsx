import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import vatService from "../../../../../core/services/vatService";
import "./VatSettingsPage.css";

const VatSchema = Yup.object().shape({
  code: Yup.string().required("Vergi kodu zorunludur"),
  description: Yup.string().required("Açıklama zorunludur"),
  rate: Yup.number().min(0).max(1).required("Oran (0-1 arası) zorunludur"),
});

const VatSettingsPage = () => {
  const [vats, setVats] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Sayfa yüklenince KDV oranlarını çek
  useEffect(() => {
    (async () => {
      const list = await vatService.getAll();
      setVats(list);
    })();
  }, []);

  // Ekle veya güncelle
  const handleSave = async (values) => {
    try {
      if (editItem) {
        await vatService.update(editItem.code, values);
      } else {
        await vatService.add(values);
      }
      const updated = await vatService.getAll();
      setVats(updated);
      setModalOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (code) => {
    if (!window.confirm("Bu vergi oranını silmek istediğinize emin misiniz?")) return;
    await vatService.remove(code);
    const updated = await vatService.getAll();
    setVats(updated);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>💰 KDV / Vergi Ayarları</h2>
        <button className="btn green" onClick={() => { setEditItem(null); setModalOpen(true); }}>
          Yeni Oran Ekle
        </button>
      </div>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Kod</th>
              <th>Açıklama</th>
              <th>Oran</th>
              <th>KDV Dâhil?</th>
              <th>Aktif</th>
              <th>Oluşturulma</th>
              <th>Güncelleme</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {vats.length === 0 ? (
              <tr><td colSpan="8" className="empty-msg">Henüz kayıt yok</td></tr>
            ) : (
              vats.map((v) => (
                <tr key={v.code}>
                  <td>{v.code}</td>
                  <td>{v.description}</td>
                  <td>{(v.rate * 100).toFixed(2)}%</td>
                  <td>{v.includedInPrice ? "Evet" : "Hayır"}</td>
                  <td>{v.active ? "✓" : "✗"}</td>
                  <td>{new Date(v.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(v.updatedAt).toLocaleDateString()}</td>
                  <td className="actions">
                    <button className="btn small gray" onClick={() => { setEditItem(v); setModalOpen(true); }}>Düzenle</button>
                    <button className="btn small red" onClick={() => handleDelete(v.code)}>Sil</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* === Modal === */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-box large">
            <h3>{editItem ? "Oran Düzenle" : "Yeni Vergi Oranı Ekle"}</h3>

            <Formik
              enableReinitialize
              initialValues={{
                code: editItem?.code || "",
                description: editItem?.description || "",
                rate: editItem?.rate || 0,
                includedInPrice: editItem?.includedInPrice || false,
                active: editItem?.active ?? true,
              }}
              validationSchema={VatSchema}
              onSubmit={(values) => handleSave(values)}
            >
              {() => (
                <Form className="form-two-column">
                  <div className="form-col">
                    <label>Vergi Kodu</label>
                    <Field name="code" className="form-input" disabled={!!editItem} />
                    <ErrorMessage name="code" component="div" className="form-error" />

                    <label>Açıklama</label>
                    <Field name="description" className="form-input" />
                    <ErrorMessage name="description" component="div" className="form-error" />

                    <label>Oran (örneğin 0.18 = %18)</label>
                    <Field name="rate" type="number" step="0.001" className="form-input" />
                    <ErrorMessage name="rate" component="div" className="form-error" />
                  </div>

                  <div className="form-col">
                    <div className="checkbox-row">
                      <label>
                        <Field type="checkbox" name="includedInPrice" />
                        Fiyat KDV Dâhil
                      </label>
                    </div>

                    <div className="checkbox-row">
                      <label>
                        <Field type="checkbox" name="active" />
                        Aktif
                      </label>
                    </div>
                  </div>

                  <div className="form-actions two-column">
                    <button type="button" className="btn gray" onClick={() => setModalOpen(false)}>
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
      )}
    </div>
  );
};

export default VatSettingsPage;