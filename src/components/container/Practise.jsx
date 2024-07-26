// import React, { useEffect } from "react";
// import { Trans, useTranslation } from "react-i18next";

// const Practise = () => {
//   const { t, i18n } = useTranslation();

//   const languages = [
//     {
//       code: "en",
//       name: "English",
//     },
//     {
//       code: "fr",
//       name: "French",
//     },
//     {
//       code: "hi",
//       name: "Hindi",
//     },

//     {
//       code: "ar",
//       name: "Arabic",
//     },
//   ];

//   const { line1, line2 } = t("description");

//   useEffect(() => {
//     document.body.dir = i18n.dir();
//   }, [i18n, i18n.languages]);

//   return (
//     <div className="container">
//       <h1>{t("greeting")}</h1>
//       {/* <h1>{line1}</h1> */}

//       <span>
//         <Trans
//           i18nKey={line1}
//           values={{
//             name: "KingsDistributor ",
//           }}
//           components={{ 1: <b /> }}
//         />
//       </span>
//       <span>{line2}</span>

//       <div>
//         {languages.map((lng) => {
//           return (
//             <button
//               onClick={() => i18n.changeLanguage(lng.code)}
//               key={lng.code}
//             >
//               {lng.name}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Practise;
