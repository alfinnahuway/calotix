export const reduceMinValue = (sale) => {
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
