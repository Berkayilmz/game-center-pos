import * as XLSX from "xlsx";

/**
 * 🔹 ExcelService Pro
 * Uygulamanın her modülünde Excel Export / Import işlemleri için merkezi servis.
 * Kolon tanımları modül bazlı verilir. Formatlama, dosya ismi ve dil desteği içerir.
 */

export const ExcelService = {
  /**
   * 📤 VERİYİ EXCEL'E AKTARIR
   * @param {Array} data - Aktarılacak veri listesi
   * @param {Array} columns - [{ key: "code", header: "Cari Kodu", format: "currency|date|percent|string" }]
   * @param {String} fileName - Dosya adı (opsiyonel)
   */
  exportToExcel: (data, columns, fileName = "Rapor.xlsx") => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      alert("📄 Aktarılacak veri bulunamadı!");
      return;
    }

    const exportData = data.map((item) => {
      const obj = {};
      columns.forEach((col) => {
        let value = item[col.key];

        // 🔸 Formatlama türüne göre dönüşüm
        switch (col.format) {
          case "currency":
            value = typeof value === "number" ? value.toLocaleString("tr-TR", { style: "currency", currency: "TRY" }) : value;
            break;
          case "date":
            if (value instanceof Date)
              value = value.toLocaleDateString("tr-TR");
            break;
          case "percent":
            value = value ? `${parseFloat(value).toFixed(2)} %` : "";
            break;
          default:
            value = value ?? "";
        }

        obj[col.header] = value;
      });
      return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rapor");

    // 🔸 Otomatik dosya adı
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    const finalFileName = fileName.endsWith(".xlsx") ? fileName : `${fileName}-${timestamp}.xlsx`;

    XLSX.writeFile(workbook, finalFileName);
  },

  /**
   * 📥 EXCEL'DEN VERİYİ İÇE AKTARIR
   * @param {File} file - Yüklenen Excel dosyası
   * @param {Array} columns - [{ key: "code", header: "Cari Kodu" }]
   * @returns {Promise<Array>} JSON formatında içe aktarılan veri
   */
  importFromExcel: (file, columns) => {
    return new Promise((resolve, reject) => {
      if (!file) return reject("Dosya seçilmedi.");

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

          // 🔸 Header → key eşleştirme
          const mapped = jsonData.map((row) => {
            const obj = {};
            columns.forEach((col) => {
              obj[col.key] = row[col.header] ?? "";
            });
            return obj;
          });

          resolve(mapped);
        } catch (err) {
          reject(`Excel verisi okunamadı: ${err}`);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  },

  /**
   * 📋 ORTAK DOSYA ADLANDIRMA
   */
  generateFileName: (prefix = "Rapor") => {
    const date = new Date().toISOString().slice(0, 10);
    return `${prefix}-${date}.xlsx`;
  },
};