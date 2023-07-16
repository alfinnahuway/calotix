/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
		"node_modules/slick-carousel/slick/slick.css",
		"node_modules/slick-carousel/slick/slick-theme.css",
	],
	theme: {
		extend: {},
	},
	plugins: [require("flowbite/plugin")],
};
