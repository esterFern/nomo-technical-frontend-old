import React, { useState } from "react";
import { Formik } from "formik";
import Checkbox from "@material-ui/core/Checkbox";
import * as Yup from "yup";
import "./Form.css";
import { postRequest } from "../../api/requestFunctions";
import { createMetric } from "../../api/routes";

const FormSchema = Yup.object().shape({
  metricName: Yup.string().required("A name is required"),
  metricValue: Yup.number()
    .typeError("The value must be a number")
    .required("A value is required"),
  time: Yup.date().typeError("Must be a date").required("A date is required"),
});

const NowFormSchema = Yup.object().shape({
  metricName: Yup.string().required("A name is required"),
  metricValue: Yup.number()
    .typeError("The value must be a number")
    .required("A value is required"),
});

const Form = ({ requestNewData }) => {
  const [now, setNow] = useState(true);

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

    console.log("FINAL METRIC", metric);

    try {
      const response = await postRequest(createMetric, metric);
      console.log("RESPONSE", response);
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
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="Form">
            {/* <div className="NameInput"> */}
            <input
              className="Input"
              type="text"
              name="metricName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.metricName}
              placeholder="Name"
            />
            {/* <button className="SelectName" onClick={() => {}} />
            </div> */}
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
                  setNow(!now);
                  let currentTime = Date.now();
                  console.log("CURRENT TIME", currentTime);
                  setFieldValue(Date.now(), "time");
                  //handleChange();
                }}
                color={"default"}
              />
              {/* <input
                name="now"
                type="checkbox"
                checked={now}
                onChange={() => {
                  setNow(!now);
                  let currentTime = Date.now();
                  console.log("CURRENT TIME", currentTime);
                  setFieldValue(Date.now(), "time");
                  //handleChange();
                }}
              /> */}
              <div className="Checkbox"></div>
            </label>

            {!now ? (
              <input
                className="Input"
                type="text"
                name="time"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.time}
                placeholder="DD/MM/YYYY HH:MM:SS"
              />
            ) : (
              <div />
            )}

            <p className="Error">
              {!now && errors.time && touched.time && errors.time}
            </p>

            <button type="submit" disabled={isSubmitting} className="Button">
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Form;