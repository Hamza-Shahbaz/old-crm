// // import React from "react";
// // import i18n from "i18next";
// // import { initReactI18next } from "react-i18next";
// // import LanguageDetector from "i18next-browser-languagedetector";
// // // import Backend from "i18next-http-backend";

// // i18n
// //   .use(LanguageDetector)
// //   // .use(Backend)
// //   .use(initReactI18next)
// //   .init({
// //     debug: true,
// //     lng: "en",
// //     fallbackLng: "en",
// //     returnObjects: true,
// //     resources: {
// //       en: {
// //         translation: {
// //           greeting: "Hello! What is your name !",
// //           description: {
// //             line1: "You are currently on E-commerce Website. <1>{{name}}</1>",
// //             line2: "This runs all over the world.",
// //           },
// //         },
// //       },

// //       fr: {
// //         translation: {
// //           greeting: "Bonjour! Quel est ton nom !",
        
// //         description: {
// //           line1: "Vous êtes actuellement sur le site E-commerce. <1>{{name}}</1>",
// //           line2: "Cela fonctionne partout dans le monde.",
// //         },
// //       },
// //     },

// //       hi: {
// //         translation: {
// //           greeting: "नमस्ते! आपका क्या नाम है !",
// //           description: {
// //             line1: "आप वर्तमान में ई-कॉमर्स वेबसाइट पर हैं. <1>{{name}}</1>",
// //             line2: "ये पूरी दुनिया में चलता है.",
// //           },
// //         },
// //       },

// //       ar: {
// //         translation: {
// //           greeting: "مرحبًا! ما اسمك !",
        
// //         description: {
// //           line1: "<1>{{name}}</1> أنت الآن على موقع التجارة الإلكترونية.",
// //           line2: "هذا يسري في جميع أنحاء العالم.",
// //         },
// //       },
// //     },
// //     },
// //   });

// // export default i18n;


// import i18next from "i18next";
// import HttpBackend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";
// import { initReactI18next } from "react-i18next";

// const apiKey = "hEMdT7nFVE_J6cF5HYsL0A";
// const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

// i18next
//   .use(HttpBackend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: "en",

//     ns: ["default"],
//     defaultNS: "default",

//     supportedLngs: ["en","ar"],
    
//     backend: {
//       loadPath: loadPath
//     }
//   })
