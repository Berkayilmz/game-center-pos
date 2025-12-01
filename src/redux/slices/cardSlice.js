// src/redux/slices/cardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cardService from "../../core/services/cardService";

// 🔹 Kartı ID’ye göre getir
export const fetchCardById = createAsyncThunk(
  "card/fetchById",
  async (cardId) => {
    const card = await cardService.getByCardId(cardId);
    if (!card) throw new Error("Kart bulunamadı!");
    return card;
  }
);

const cardSlice = createSlice({
  name: "card",
  initialState: {
    activeCard: null,
    loading: false,
    error: null,
    pendingAmount: 0,
  },
  reducers: {
    clearActiveCard: (state) => {
      state.activeCard = null;
      state.pendingAmount = 0;
    },

    setPendingAmount: (state, action) => {
      state.pendingAmount = Number(action.payload);
    },

    // 💰 Müşteri kartına bakiye yükleme
    addBalance: (state) => {
      if (!state.activeCard || state.activeCard.type !== "customer") {
        alert("Bu işlem sadece müşteri kartı için geçerlidir!");
        return;
      }
      if (state.pendingAmount <= 0) {
        alert("Geçerli bir tutar giriniz!");
        return;
      }

      state.activeCard.balance += state.pendingAmount;
      cardService.updateCard(state.activeCard.id, state.activeCard);
      state.pendingAmount = 0;
      alert("Bakiye başarıyla yüklendi 💸");
    },

    // 💳 Aktif karttan ücret düşme
    updateBalance: (state, action) => {
      const { cardId, amount } = action.payload;
      if (!cardId || !amount) return;

      if (state.activeCard && state.activeCard.cardId === cardId) {
        state.activeCard.balance += amount;
        if (state.activeCard.balance < 0) state.activeCard.balance = 0;
        cardService.updateCard(state.activeCard.id, state.activeCard);
      }
    },

    // Karttan ücret düşme (varsa misafir düş yoksa bakiye düş)
    deductBalance: (state, action) => {
      const { amount } = action.payload;
      const card = state.activeCard;
      if (!card) return;

      // 1️⃣ Öncelik: misafir bakiyesi
      if ((card.guestBalance || 0) >= amount) {
        card.guestBalance -= amount;
      }
      // 2️⃣ Misafir bakiyesi yetersizse, eksik kalan kısmı normal bakiyeden al
      else if ((card.guestBalance || 0) > 0) {
        const remaining = amount - card.guestBalance;
        card.guestBalance = 0;
        card.balance = Math.max(0, card.balance - remaining);
      }
      // 3️⃣ Misafir bakiyesi zaten yoksa doğrudan normal bakiyeden düş
      else {
        card.balance = Math.max(0, card.balance - amount);
      }
    },

    // 🧰 Servis kartına servis yükleme
    addService: (state) => {
      if (!state.activeCard || state.activeCard.type !== "service") {
        alert("Bu kart servis kartı değil!");
        return;
      }
      if (state.pendingAmount <= 0) {
        alert("Geçerli bir servis adedi giriniz!");
        return;
      }

      state.activeCard.serviceCount += state.pendingAmount;
      cardService.updateCard(state.activeCard.id, state.activeCard);
      state.pendingAmount = 0;
      alert("Servis adedi başarıyla yüklendi 🔧");
    },

    // 🔻 Servis kullanımında 1 adet eksilt
    useService: (state) => {
      if (!state.activeCard || state.activeCard.type !== "service") {
        alert("Bu işlem servis kartı için geçerlidir!");
        return;
      }
      if (state.activeCard.serviceCount <= 0) {
        alert("Yetersiz servis adedi!");
        return;
      }

      state.activeCard.serviceCount -= 1;
      cardService.updateCard(state.activeCard.id, state.activeCard);
      alert("1 servis kullanıldı ✅");
    },

    // 👥 Misafir yükleme
    addGuestBalance: (state) => {
      if (state.activeCard && state.pendingAmount > 0) {
        state.activeCard.guestBalance += state.pendingAmount;
        cardService.updateCard(state.activeCard.id, state.activeCard);
        state.pendingAmount = 0;
      }
    },

    // 🎟️ Özel satış yükleme (Yeni)
    // 🎟️ Özel satış yükleme (updateCard ile tutarlı versiyon)
    addSpecialSale: (state, action) => {
      const { name, credit, price } = action.payload;
      const card = state.activeCard;

      if (!card) {
        alert("Lütfen önce bir kart okutun 💳");
        return;
      }

      if (!name || credit <= 0 || price <= 0) {
        alert("Geçerli bir kampanya adı, kredi ve fiyat giriniz!");
        return;
      }

      // 🧠 İş mantığı: aktif kartı doğrudan Redux içinde güncelle
      if (!Array.isArray(card.specialSales)) {
        card.specialSales = [];
      }

      card.specialSales.push({
        name,
        credit,
        price,
        date: new Date().toISOString(),
      });

      // Krediyi mevcut bakiyeye ekle
      card.balance += credit;

      // 🗃️ LocalStorage senkronizasyonu
      cardService.updateCard(card.id, card);

      alert(`🎟️ ${name} kampanyasından ${credit} kredi (${price}₺) eklendi!`);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardById.fulfilled, (state, action) => {
        state.loading = false;
        state.activeCard = action.payload;
      })
      .addCase(fetchCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  clearActiveCard,
  setPendingAmount,
  addBalance,
  updateBalance,
  deductBalance,
  addService,
  useService,
  addGuestBalance,
  addSpecialSale, // ✅ eklendi
} = cardSlice.actions;

export default cardSlice.reducer;