// // Filename - App.js

// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";

// // Contains the value and text for the options
// const languages = [
// 	{ value: "en", text: "English" },
// 	{ value: "ar", text: "Arabic" },

// ];

// function Test() {
// 	// It is a hook imported from 'react-i18next'
// 	const { t } = useTranslation();

// 	const [lang, setLang] = useState("en");

// 	// This function put query that helps to
// 	// change the language
// 	const handleChange = (e) => {
// 		setLang(e.target.value);
// 		let loc = "http://localhost:5173/";
// 		window.location.replace(
// 			loc + "?lng=" + e.target.value
// 		);
// 	};

// 	return (
// 		<div className="App">
		
// 			{/* We are showing the value by using the 
// 			keys we have created in the website */}
// 			<h1>{t("Powder")}</h1>
// 			<label>{t("coder")}</label>
// 			<select value={lang} onChange={handleChange}>
// 				{languages.map((item) => {
// 					return (
// 						<option
// 							key={item.value}
// 							value={item.value}
// 						>
// 							{item.text}
// 						</option>
// 					);
// 				})}
// 			</select>
// 		</div>
// 	);
// }

// export default Test;