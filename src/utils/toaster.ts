import Noty from "noty";

type LogLevel = "success" | "error" | "info" | "warning";

export const Toaster = {
  show: function show(type: LogLevel, text: string) {
    new Noty({
      type,
      text,

      timeout: 3000,
      progressBar: true,
      layout: "topCenter",
      theme: "metroui",
      animation: {
        open: "animated fadeIn",
        close: "animated fadeOut"
      }
    }).show();
  }
};
