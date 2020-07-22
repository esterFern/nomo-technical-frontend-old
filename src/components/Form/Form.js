import React, { useState } from "react";
import { Formik } from "formik";
import Checkbox from "@material-ui/core/Checkbox";
import * as Yup from "yup";

import "./Form.css";

import { postRequest } from "Api/requestFunctions";
import { createMetric } from "Api/routes";
import ConfirmationModal from "Components/Modals/ConfirmationModal";
import { checkDateFormat } from "Functions/dates";

const FormSchema = Yup.object().shape({
  metricName: Yup.string().required("A name is required"),
  metricValue: Yup.number()
    .typeError("The value must be a number")
    .required("A value is required"),
  time: Yup.string().required("A date is required"),
});

const NowFormSchema = Yup.object().shape({
  metricName: Yup.string().required("A name is required"),
  metricValue: Yup.number()
    .typeError("The value must be a number")
    .required("A value is required"),
});

const Form = ({ requestNewData }) => {
  const [now, setNow] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [dateError, setDateError] = useState("");

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    let timestamp = Date.now();
    if (!now) {
      let separator = "/";
      if (!values.time.includes("/")) {
        separator = "-";
      }
      const day = values.time.split(separator)[0];
      const month = values.time.split(separator)[1];
      const yearAndTime = values.time.split(separator)[2];
      const finalDate = `${month}-${day}-${yearAndTime}`;
      timestamp = new Date(finalDate).getTime();
    }
    const metric = {
      name: values.metricName,
      value: values.metricValue,
      timestamp,
    };

    try {
      const response = await postRequest(createMetric, metric);
      if (response.data.status === 200) setConfirmationModal(true);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else alert(error);
    }

    requestNewData();
    setSubmitting(false);
    resetForm({ values: "" });
  };

  const checkDateError = (d) => {
    if (d === "") {
      setDateError("Date is required.");
      return true;
    } else if (!checkDateFormat(d)) {
      setDateError(
        "Provide a valid date in format DD/MM/YYYY HH:MM:SS, including leading zero."
      );
      return true;
    } else {
      setDateError("");
      return false;
    }
  };

  return (
    <div className="Container">
      <Formik
        initialValues={{ metricName: "", metricValue: "", time: "" }}
        validationSchema={now ? NowFormSchema : FormSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          isSubmitting,
        }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setFieldTouched("metricName");
              setFieldTouched("metricValue");
              if (now) {
                handleSubmit();
              } else {
                if (!checkDateError(values.time)) {
                  handleSubmit();
                }
              }
            }}
            className="Form"
          >
            <input
              className="Input"
              type="text"
              name="metricName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.metricName}
              placeholder="Name"
            />

            <p className="Error">
              {errors.metricName && touched.metricName && errors.metricName}
            </p>

            <input
              className="Input"
              type="text"
              name="metricValue"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.metricValue}
              placeholder="Value"
            />

            <p className="Error">
              {errors.metricValue && touched.metricValue && errors.metricValue}
            </p>
            <label className="CurrentTime">
              Current time:
              <Checkbox
                checked={now}
                onChange={() => {
                  if (!now) {
                    setDateError("");
                  }
                  setNow(!now);

                  setFieldValue(Date.now(), "time");
                }}
                color={"default"}
              />
              <div className="Checkbox"></div>
            </label>

            {!now ? (
              <input
                className="Input"
                type="text"
                name="time"
                onChange={(e) => {
                  setFieldValue("time", e.target.value);
                  checkDateError(e.target.value);
                }}
                onBlur={(e) => {
                  setFieldTouched("time", true);
                  checkDateError(e.target.value);
                }}
                value={values.time}
                placeholder="DD/MM/YYYY HH:MM:SS"
              />
            ) : (
              <div />
            )}

            <p className="Error">{!now && dateError}</p>

            <button type="submit" disabled={isSubmitting} className="Button">
              Submit
            </button>
          </form>
        )}
      </Formik>

      <ConfirmationModal
        isOpen={confirmationModal}
        closeModal={() => {
          setConfirmationModal(false);
        }}
      />
    </div>
  );
};

export default Form;
