export const convertPrice = (val) => {
	const formatter = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	if (val === 0) {
		return "0";
	} else {
		return formatter.format(val);
	}
};
