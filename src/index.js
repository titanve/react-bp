import React from "react";
import ReactDOM from "react-dom";
import { addLocaleData, IntlProvider } from "react-intl";
import App from "./components/App";

import en from "react-intl/locale-data/en";
import es from "react-intl/locale-data/es";

import { flattenMessages } from "utils/utils";

import messages from "messages";

addLocaleData([...en, ...es]);

let locale =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage ||
  "es-ES";
console.log({ locale: locale });

import "./styles/style.sass";

ReactDOM.render(
  <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
    <App locale={locale} />
  </IntlProvider>,
  document.getElementById("app")
);
