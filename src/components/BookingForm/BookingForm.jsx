import { useState } from "react";
import DatePicker from "react-datepicker";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import styles from "./BookingForm.module.css";

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    date: null,
    comment: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    date: Yup.date()
      .required("Please select a booking date")
      .min(new Date(), "Booking date cannot be in the past")
      .nullable()
      .typeError("Please select a booking date"),
  });

  const handleSubmit = (values, { resetForm, setFieldTouched }) => {
    if (!values.date) {
      setFieldTouched("date", true, true);
      toast.error(
        "Please select a booking date to proceed with your reservation"
      );
      return;
    }

    toast.success("Your booking request has been submitted successfully!");
    resetForm();
    setSelectedDate(null);
  };

  return (
    <div className={styles.booking_section}>
      <h2 className={`${styles.section_title} ${styles.form_title}`}>
        Book your campervan now
      </h2>
      <p className={styles.form_text}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched, setFieldTouched }) => (
          <Form className={styles.booking_form}>
            <div>
              <Field
                type="text"
                name="name"
                placeholder="Name*"
                className={styles.input}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error_message}
              />
            </div>
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email*"
                className={styles.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error_message}
              />
            </div>
            <div>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setFieldValue("date", date);
                  setFieldTouched("date", true, true);
                }}
                onBlur={() => setFieldTouched("date", true)}
                dateFormat="dd.MM.yyyy"
                placeholderText="Select booking date*"
                minDate={new Date()}
                className={`${styles.input} ${styles.date_input} ${
                  errors.date && touched.date ? styles.error_input : ""
                }`}
              />
              <ErrorMessage
                name="date"
                component="div"
                className={styles.error_message}
              />
            </div>
            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              rows="3"
              className={styles.input}
              style={{ resize: "none" }}
            />
            <button
              type="submit"
              className={`${styles.submit_button} primary_button`}
            >
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
