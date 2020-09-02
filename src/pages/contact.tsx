import { useState } from "react";
import Head from "next/head";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

import Layout, { siteTitle } from "../components/layout";

const MyTextInput: React.FC<any> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        className={`block tracking-wide text-xs font-bold mb-2 ${
          meta.touched && meta.error ? "text-red-800" : "text-gray-700"
        }`}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
          meta.touched && meta.error ? "border-red-800" : "border-gray-200"
        }`}
        {...field}
        {...props}
      />

      <div className="text-red-800 text-xs h-2">
        {meta.touched && meta.error && meta.error}
      </div>
    </>
  );
};

const MyTextAreaInput: React.FC<any> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        className={`block tracking-wide text-xs font-bold mb-2 ${
          meta.touched && meta.error ? "text-red-800" : "text-gray-700"
        }`}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <textarea
        className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
          meta.touched && meta.error ? "border-red-800" : "border-gray-200"
        }`}
        {...field}
        {...props}
      />

      <div className="text-red-800 text-xs h-2">
        {meta.touched && meta.error && meta.error}
      </div>
    </>
  );
};

export default function Projects() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <Layout>
      <Head>
        <title>{`Get In Touch | ${siteTitle}`}</title>
      </Head>
      <div
        className="py-8 px-2"
        style={{
          backgroundColor: "#3075b9",
          backgroundImage: `url("/patterns/triangles.svg"`,
        }}
      >
        <div className="container bg-white mx-auto w-full max-w-2xl p-4 rounded shadow-sm">
          <h1 className="text-2xl border-b">Want to Talk?</h1>
          <p className="text-gray-700">
            Just fill out this form, and I'll email you back. No spam, please 😋
          </p>

          {submitted ? (
            <p className="my-12">
              <span className="text-green-800 font-semibold">
                Message Received!
              </span>{" "}
              I'll get back to you soon.
            </p>
          ) : (
            <Formik
              initialValues={{
                name: "",
                email: "",
                message: "",
              }}
              validationSchema={Yup.object({
                name: Yup.string().required("Required"),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
                message: Yup.string().required("Required"),
              })}
              onSubmit={async (values) => {
                const response = await fetch("/api/email", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                });
                setSubmitted(true);
              }}
            >
              {(formik) => (
                <Form className="w-full mt-4">
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <MyTextInput
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Jane"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                      <MyTextInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="jane@smith.com"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3 mb-6 md:mb-0">
                      <MyTextAreaInput label="Message" name="message" />
                    </div>
                  </div>
                  <div className="text-right">
                    {formik.submitCount > 0 && !formik.isValid && (
                      <p className="text-red-800 text-sm px-2 inline">
                        Some fields are missing/invalid.
                      </p>
                    )}
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      disabled={formik.isSubmitting}
                    >
                      Send
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </Layout>
  );
}
