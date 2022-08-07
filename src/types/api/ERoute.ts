export type ERoute =
    EGeneralRoute |
    EAcademyRoute |
    EBudgetRoute |
    EcryptoRoute |
    "/shortcut/cash"

type EAcademyRoute =
  "/academy" |
  "/academy/order/:course" |
  "/academy/homeworks"

type EBudgetRoute =
  "/budget/dates/:month/:year" |
  "/budget/currency/:currency/:month/:year" |
  "/budget/mir/currency" |
  "/budget/:category/:column/:start/:end/:course/:ruble"

type EGeneralRoute =
  "/" |
  "/cd" |
  "/done" |
  "/done/:text" |
  "/fail" |
  "/ping"

type EcryptoRoute =
  "/crypto"
