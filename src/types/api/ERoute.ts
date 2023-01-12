export type ERoute =
    EGeneralRoute |
    EAcademyRoute |
    EBudgetRoute |
    EXMRRoute |
    EKrakenRoute

type EAcademyRoute =
  "/academy" |
  "/academy/order/:course" |
  "/academy/homeworks"

type EBudgetRoute =
  "/budget/dates/:month/:year" |
  "/budget/currency/:currency/:month/:year" |
  "/budget/mir/currency" |
  "/budget/:category/:column/:start/:end/:course/:ruble"

type EXMRRoute =
  "/xmr/sync" |
  "/xmr/share"

type EKrakenRoute =
  "/kraken/mainloop" |
  "/kraken/start" |
  "/kraken/stop" |
  "/kraken/tickers/prepare" |
  "/kraken/order/monitor"

type EGeneralRoute =
  "/" |
  "/cd" |
  "/done" |
  "/done/:text" |
  "/fail" |
  "/ping" |
  "/logs" |
  "/logs/flush"
