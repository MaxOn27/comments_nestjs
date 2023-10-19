import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../App.css";

const CreateComment = () => {
    const validationSchema = Yup.object().shape({
      username: Yup.string(),
      email: Yup.string().required("Email is required"),
      comment: Yup.string().required("Comment is required")
    });

    const formik = useFormik({
      initialValues: {
        username: "",
        email: "",
        comment: ""
      },
      validationSchema,
      onSubmit: async (values, { resetForm }) => {
        await axios.post("http://localhost:3001/newComment", values);
        window.location.reload();

        resetForm({
          values: {
            username: "",
            email: "",
            comment: ""
          }
        });
      }
    });

    return (
      <div className="w-full flex justify-center mt-3">
        <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" type="text" placeholder="Username..."
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="error">{formik.errors.username}</p>
            ) : null}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email" type="email" placeholder="Email..."
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
              Comment
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="comment" type="text" placeholder="Comment..."
              value={formik.values.comment}
              onChange={formik.handleChange}
            />
            {formik.touched.comment && formik.errors.comment ? (
              <div className="error">{formik.errors.comment}</div>
            ) : null}
          </div>
          <div className="flex items-center justify-between">

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Post
            </button>
          </div>
        </form>
      </div>
    );
  }
;

export default CreateComment;