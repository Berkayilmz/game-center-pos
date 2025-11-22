import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../dispatch.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// 🔹 Tür bazlı dinamik ayarlar
const dispatchTypeConfig = {
  purchase: { title: "Alış İrsaliyesi", stockDirection: "in", color: "green" },
  sales: { title: "Satış İrsaliyesi", stockDirection: "out", color: "orange" },
  purchaseReturn: { title: "Alış İade İrsaliyesi", stockDirection: "out", color: "red" },
  salesReturn: { title: "Satış İade İrsaliyesi", stockDirection: "in", color: "blue" },
};

const schema = Yup.object().shape({
  docDate: Yup.string().required("Evrak tarihi zorunludur"),
  docNo: Yup.string().required("Evrak numarası zorunludur"),
  account: Yup.string().required("Cari hesap seçilmelidir"),
});

const DispatchPage = () => {
  const { type } = useParams(); // URL'den /dispatch/:type
  const config = dispatchTypeConfig[type] || dispatchTypeConfig.purchase;

  const [rows, setRows] = useState([]);
  const [printed, setPrinted] = useState(false);

  const handleAddRow = () => {
    setRows([...rows, { code: "", name: "", qty: 1, unit: "Adet", warehouse: "MERKEZ" }]);
  };

  const handleDeleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  return (
    <div className="settings-page">
      <h2 style={{ color: `var(--color-${config.color})` }}>📄 {config.title}</h2>

      <Formik
        initialValues={{
          docDate: new Date().toISOString().slice(0, 10),
          docNo: "",
          toStock: true,
          account: "",
          description: "",
          deliverer: "",
          receiver: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          console.log("İrsaliye Kaydedildi:", { ...values, type, rows });
          alert(`${config.title} kaydedildi!`);
        }}
      >
        {({ values }) => (
          <Form>
            <div className="form-two-column">
              <div className="form-col">
                <label>Evrak Tarihi</label>
                <Field name="docDate" type="date" className="form-input" />

                <label>Evrak No</label>
                <Field name="docNo" className="form-input" />

                <label>
                  <Field type="checkbox" name="toStock" />
                  &nbsp; Stoklara İşle
                </label>

                <label>Cari Hesap</label>
                <Field name="account" className="form-input" placeholder="Cari Hesap Seçin" />

                <label>Açıklama</label>
                <Field as="textarea" name="description" rows="2" className="form-input" />
              </div>

              <div className="form-col">
                <label>Teslim Eden</label>
                <Field name="deliverer" className="form-input" />
                <label>Teslim Alan</label>
                <Field name="receiver" className="form-input" />

                <label>
                  <input
                    type="checkbox"
                    checked={printed}
                    onChange={(e) => setPrinted(e.target.checked)}
                  />
                  &nbsp; İrsaliye Yazdırıldı mı?
                </label>
              </div>
            </div>

            {/* Ürün tablosu */}
            <div className="irsaliye-table">
              <div className="irsaliye-actions">
                <button
                  type="button"
                  className="btn green small"
                  onClick={handleAddRow}
                >
                  + Ürün Ekle
                </button>
                <button
                  type="button"
                  className="btn red small"
                  onClick={() => setRows([])}
                >
                  Tümünü Sil
                </button>
              </div>

              <table className="product-table">
                <thead>
                  <tr>
                    <th>Ürün Kodu</th>
                    <th>Ürün Adı</th>
                    <th>Miktar</th>
                    <th>Birim</th>
                    <th>Depo</th>
                    <th>İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="empty-msg">
                        Gösterilecek veri yok.
                      </td>
                    </tr>
                  ) : (
                    rows.map((r, i) => (
                      <tr key={i}>
                        <td>
                          <input
                            value={r.code}
                            onChange={(e) =>
                              setRows((prev) =>
                                prev.map((x, idx) =>
                                  idx === i ? { ...x, code: e.target.value } : x
                                )
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            value={r.name}
                            onChange={(e) =>
                              setRows((prev) =>
                                prev.map((x, idx) =>
                                  idx === i ? { ...x, name: e.target.value } : x
                                )
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={r.qty}
                            onChange={(e) =>
                              setRows((prev) =>
                                prev.map((x, idx) =>
                                  idx === i ? { ...x, qty: e.target.value } : x
                                )
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            value={r.unit}
                            onChange={(e) =>
                              setRows((prev) =>
                                prev.map((x, idx) =>
                                  idx === i ? { ...x, unit: e.target.value } : x
                                )
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            value={r.warehouse}
                            onChange={(e) =>
                              setRows((prev) =>
                                prev.map((x, idx) =>
                                  idx === i ? { ...x, warehouse: e.target.value } : x
                                )
                              )
                            }
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn red small"
                            onClick={() => handleDeleteRow(i)}
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

            <div className="form-actions">
              <button type="submit" className="btn green">
                Kaydet
              </button>
              <button type="button" className="btn gray">
                İptal
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DispatchPage;