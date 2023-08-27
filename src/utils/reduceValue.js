export const reduceMinValue = (sale) => {
  if (sale.length === 0) {
    return null; // Mengembalikan null jika data kosong
  }
  return sale.reduce((valMin, itemSale) => {
    const prices = itemSale.price;
    return prices < valMin ? prices : valMin;
  }, Infinity);
};

export const reduceMaxValue = (sale) => {
  return sale.reduce((valMax, itemSale) => {
    const prices = itemSale.price;
    return prices > valMax ? prices : valMax;
  }, 0);
};
