import * as yup from "yup";

export const basicSchema = yup.object().shape({
  // description: yup
  //   .string()
  //   .min(3, "Görev açıklaması minumum 3 karekter uzunluğunda olmalıdır")
  //   .required("Görev açıklaması zorunludur"),
  description: yup
    .string()
    .min(3, "Kullanıcı adı minunmum 3 karakter uzunluğunda olmadılır")
    .required("Kullanıcı adı zorunludur"),
  targetDate: yup
    .date("Geçerli bir tarih giriniz")
    .required("Geçerli bir tarih girmek zorunludur"),
});
