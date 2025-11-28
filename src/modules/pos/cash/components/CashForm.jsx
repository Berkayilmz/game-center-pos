import React, { useState, useMemo } from "react";
import "../cash.css";

/**
 * Genel Kasa Formu
 * Tüm kasa işlemleri (tahsilat, ödeme, devir, açılış, virman) bu bileşeni kullanır.
 */
const CashForm = ({ title = "Kasa İşlemi", type = "collection" }) => {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    docNo: "",
    dueDate: "",
    customer: "",
    cashAccount: "",
    sourceCash: "",
    targetCash: "",
    transactionType: "",
    transactionMethod: "",
    amount: "",
    description: "",
  });

  const theme = useMemo(() => {
    const map = {
      collection: { color: "#2c9e3f", label: "Tahsilat", sign: "+" },
      payment: { color: "#d93025", label: "Ödeme", sign: "-" },
      transfer: { color: "#1d72b8", label: "Virman", sign: "↔" },
      opening: { color: "#ff8c00", label: "Açılış", sign: "+" },
      closing: { color: "#555", label: "Kapanış", sign: "-" },
      default: { color: "#444", label: "İşlem", sign: "" },
    };
    return map[type] || map.default;
  }, [type]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      docNo: "",
      dueDate: "",
      customer: "",
      cashAccount: "",
      sourceCash: "",
      targetCash: "",
      transactionType: "",
      transactionMethod: "",
      amount: "",
      description: "",
    });
  };

  const validate = () => {
    if (type === "transfer") {
      if (!form.sourceCash || !form.targetCash || !form.amount)
        return "Borçlu kasa, alacaklı kasa ve tutar alanları zorunludur!";
      if (form.sourceCash === form.targetCash)
        return "Borçlu ve alacaklı kasa aynı olamaz!";
      return null;
    }

    if (!form.amount || !form.cashAccount)
      return "Kasa ve tutar alanları zorunludur!";
    if (["collection", "payment"].includes(type) && !form.customer)
      return "Cari hesap alanı zorunludur!";
    return null;
  };

  const handleSubmit = () => {
    const error = validate();
    if (error) return alert(error);

    const record = {
      id: `TX-${Date.now()}`,
      operationType: type,
      operationLabel: theme.label,
      ...form,
      amount: parseFloat(form.amount),
      sign: theme.sign,
      createdAt: new Date().toISOString(),
      user: "admin",
      status: "success",
    };

    console.log(`💾 [${theme.label.toUpperCase()} LOG]`, record);
    alert(`${theme.label} kaydı başarıyla oluşturuldu ✅`);
    resetForm();
  };

  return (
    <div className="cash-form">
      <h2 style={{ color: theme.color }}>{title}</h2>

      <div className="form-grid">
        <label>Tarih:</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} />

        <label>Saat:</label>
        <input type="time" name="time" value={form.time} onChange={handleChange} />

        <label>Evrak No:</label>
        <input name="docNo" value={form.docNo} onChange={handleChange} />

        <label>Vade Tarihi:</label>
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />

        {/* 🧾 Carili işlemler */}
        {["collection", "payment"].includes(type) && (
          <>
            <label className="required">Cari Hesap:</label>
            <input
              name="customer"
              value={form.customer}
              onChange={handleChange}
              placeholder="Cari hesap seçin..."
            />
          </>
        )}

        {/* 💱 Kasa Virman (Transfer) */}
        {type === "transfer" ? (
          <>
            <label className="required">Borçlu Kasa:</label>
            <select name="sourceCash" value={form.sourceCash} onChange={handleChange}>
              <option value="">Seçiniz...</option>
              <option value="NAKIT">NAKİT</option>
              <option value="CEK">ÇEK</option>
              <option value="SENET">SENET</option>
              <option value="KREDI">KREDİ KARTI</option>
            </select>

            <label className="required">Alacaklı Kasa:</label>
            <select name="targetCash" value={form.targetCash} onChange={handleChange}>
              <option value="">Seçiniz...</option>
              <option value="NAKIT">NAKİT</option>
              <option value="CEK">ÇEK</option>
              <option value="SENET">SENET</option>
              <option value="KREDI">KREDİ KARTI</option>
            </select>
          </>
        ) : (
          <>
            <label className="required">Kasa Seçiniz:</label>
            <select name="cashAccount" value={form.cashAccount} onChange={handleChange}>
              <option value="">Seçiniz...</option>
              <option value="NAKIT">NAKİT</option>
              <option value="CEK">ÇEK</option>
              <option value="SENET">SENET</option>
              <option value="KREDI">KREDİ KARTI</option>
            </select>
          </>
        )}

        <label>İşlem Türü:</label>
        <input
          name="transactionType"
          value={form.transactionType}
          onChange={handleChange}
          placeholder={type === "transfer" ? "Kasa Virman" : "Tahsilat, Ödeme, Transfer..."}
        />

        <label>İşlem Şekli:</label>
        <input
          name="transactionMethod"
          value={form.transactionMethod}
          onChange={handleChange}
          placeholder="Örn: Nakit, EFT, POS..."
        />

        <label className="required">İşlem Tutarı:</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="0.00"
        />

        <label>Açıklama:</label>
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="İsteğe bağlı açıklama..."
        />
      </div>

      <div className="button-group">
        <button className="btn blue" onClick={resetForm}>Yeni</button>
        <button className="btn gray" onClick={() => alert("Yazdırma özelliği eklenecek 🖨️")}>Yazdır</button>
        <button className="btn gray" onClick={() => alert("Çıktı tasarım aracı yakında 📄")}>Çıktı Tasarla</button>
        <button className="btn green" onClick={handleSubmit}>Kaydet</button>
        <button className="btn red" onClick={resetForm}>İptal</button>
      </div>
    </div>
  );
};

export default CashForm;