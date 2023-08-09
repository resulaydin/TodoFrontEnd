import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { basicSchema } from "../schemas";
import "../assets/style/css/formik.css";
import { useAuth } from "../security/AuthContext";
import { addUserTodo } from "../api/apiCall";

const TodoFormik = () => {
  const [todo, setTodo] = useState({
    description: "",
    targetDate: null,
    username: "",
    done: false,
  });
  const { username } = useAuth().authInfo;
  const onAddUserTodo = async (values, actions) => {
    setTodo((previous) => ({ ...previous, username, done: false, ...values }));

    const body = {
      username,
      ...values,
      done: false,
    };

    try {
      const response = await addUserTodo(username, body);
      console.log(response);
      actions.resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        description: "",
        targetDate: "",
      },
      validationSchema: basicSchema,
      onSubmit: onAddUserTodo,
    });
  return (
    <div className="container">
      <div className="formik-wrapper">
        <h1>Enter Todo Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputDiv">
            <label>Description</label>
            <input
              type="text"
              id="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Açıklama giriniz"
              className={errors.description ? "input-error" : ""}
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
          <div className="inputDiv">
            <label>TargetDate</label>
            <input
              type="date"
              id="targetDate"
              value={values.targetDate}
              onChange={handleChange}
              placeholder="Tarih giriniz"
              className={errors.targetDate ? "input-error" : ""}
            />

            {errors.targetDate && <p className="error">{errors.targetDate}</p>}
          </div>
          <button disabled={isSubmitting} type="submit">
            Kaydet
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoFormik;
