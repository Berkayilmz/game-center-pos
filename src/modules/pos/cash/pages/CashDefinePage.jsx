import React, { useState } from "react";
import "../cash.css";

const CashDefinePage = () => {
  const [cashes, setCashes] = useState([
    { id: 1, name: "NAKİT" },
    { id: 2, name: "ÇEK" },
    { id: 3, name: "SENET" },
    { id: 4, name: "KREDİ KARTI" },
  ]);

  const [selected, setSelected] = useState(null);
  const [newName, setNewName] = useState("");

  const handleSelect = (cash) => {
    setSelected(cash.id);
    setNewName(cash.name);
  };

  const handleAdd = () => {
    if (!newName.trim()) return alert("Kasa adı boş olamaz!");
    const newItem = { id: Date.now(), name: newName.trim() };
    setCashes([...cashes, newItem]);
    setNewName("");
  };

  const handleDelete = () => {
    if (!selected) return alert("Silmek için bir kasa seçin!");
    setCashes(cashes.filter((c) => c.id !== selected));
    setSelected(null);
    setNewName("");
  };

  const handleSave = () => {
    if (!selected) return alert("Düzenlenecek kasa seçin!");
    if (!newName.trim()) return alert("Kasa adı boş olamaz!");
    setCashes(
      cashes.map((c) =>
        c.id === selected ? { ...c, name: newName.trim() } : c
      )
    );
    setSelected(null);
    setNewName("");
  };

  const handleCancel = () => {
    setSelected(null);
    setNewName("");
  };

  return (
    <div className="cash-define-page">
      <h2>🏦 Kasa Tanımları</h2>

      <table className="cash-table">
        <thead>
          <tr>
            <th>Kasa Adı</th>
          </tr>
        </thead>
        <tbody>
          {cashes.map((c) => (
            <tr
              key={c.id}
              onClick={() => handleSelect(c)}
              className={selected === c.id ? "selected" : ""}
            >
              <td>{c.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cash-form-inline">
        <input
          type="text"
          placeholder="Kasa adı girin..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button className="btn blue" onClick={handleAdd}>Kayıt Ekle</button>
        <button className="btn red" onClick={handleDelete}>Kayıt Sil</button>
        <button className="btn green" onClick={handleSave}>Kaydet</button>
        <button className="btn gray" onClick={handleCancel}>İptal</button>
      </div>
    </div>
  );
};

export default CashDefinePage;