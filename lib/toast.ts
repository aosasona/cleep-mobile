import * as Burnt from "burnt";
export function showAlert(
  title: string,
  msg: string,
  preset: "heart" | "done" | "error" | "spinner" = "done"
) {
  Burnt.alert({
    title: title,
    message: msg,
    preset: preset as any,
  });
}

export function showToast(
  title: string,
  msg: string,
  preset: "done" | "error"
) {
  Burnt.toast({
    title: "",
    message: msg,
    preset: preset,
    duration: 4,
  });
}
