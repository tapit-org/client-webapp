import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

// material-ui
import {
	Button,
	Checkbox,
	FormControlLabel,
	FormHelperText,
	Grid,
	Link,
	Stack,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
// assets
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { auth } from "firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { dispatch } from "store";
import { handleShowErrorToast } from "services/notification.service";
import useBoolState from "hooks/useBoolState";
import { createUser, getUser } from "services/auth.service";
import { setUser } from "store/reducers/user";
import OverlayLoader from "components/OverlayLoader";

// ============================|| FIREBASE - LOGIN ||============================ //

const LoginForm = () => {
	const navigate = useNavigate();
	const [showLoader, toggleShowLoader] = useBoolState(false);
	const [checked, setChecked] = React.useState(false);
	const handleLogin = async (email: string, password: string) => {
		try {
			toggleShowLoader();
			const firebaseRespose = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const accessToken = await firebaseRespose.user.getIdToken();
			localStorage.setItem("access_token", accessToken);
			const user = await getUser();
			dispatch(setUser(user));
			toggleShowLoader();
			navigate("/");
		} catch (error) {
			console.log(error.code);
			if (error.code === "auth/invalid-login-credentials") {
				handleShowErrorToast("Invalid Login Credentials");
			} else {
				handleShowErrorToast("Something went wrong - " + error.code);
			}
			toggleShowLoader();
		}
	};
	return (
		<>
			{showLoader && <OverlayLoader />}
			<Formik
				initialValues={{
					email: "testtest@gmail.com",
					password: "testtest",
					submit: null,
				}}
				validationSchema={Yup.object().shape({
					email: Yup.string()
						.email("Must be a valid email")
						.max(255)
						.required("Email is required"),
					password: Yup.string()
						.max(255)
						.required("Password is required"),
				})}
				onSubmit={async (
					values,
					{ setErrors, setStatus, setSubmitting },
				) => {
					try {
						setStatus({ success: false });
						await handleLogin(values.email, values.password);
						setSubmitting(false);
					} catch (err) {
						setStatus({ success: false });
						setErrors({ submit: err.message });
						setSubmitting(false);
					}
				}}
			>
				{({
					errors,
					handleBlur,
					handleChange,
					handleSubmit,
					isSubmitting,
					touched,
					values,
				}) => (
					<form noValidate onSubmit={handleSubmit}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Stack spacing={1}>
									<Label>Email</Label>
									<div className="mt-1.5 flex">
										<span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
											<EmailOutlined fontSize="small" />
										</span>
										<Input
											id="email-login"
											type="email"
											name="email"
											value={values.email}
											className="!rounded-l-none"
											onBlur={handleBlur}
											onChange={handleChange}
											placeholder="Enter Email"
										/>
									</div>
									{touched.email && errors.email && (
										<FormHelperText
											error
											id="standard-weight-helper-text-email-login"
										>
											{errors.email}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={12}>
								<Stack spacing={1}>
									<Label>Password</Label>
									<div className="mt-1.5 flex">
										<span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
											<LockOutlined fontSize="small" />
										</span>
										<Input
											id="password-login"
											type="password"
											name="password"
											value={values.password}
											className="!rounded-l-none"
											onBlur={handleBlur}
											onChange={handleChange}
											placeholder="Enter Password"
										/>
									</div>
									{touched.password && errors.password && (
										<FormHelperText
											error
											id="standard-weight-helper-text-password-login"
										>
											{errors.password}
										</FormHelperText>
									)}
								</Stack>
							</Grid>

							<Grid item xs={12} sx={{ mt: -1 }}>
								<Stack
									direction="row"
									justifyContent="space-between"
									alignItems="center"
									spacing={2}
								>
									<FormControlLabel
										control={
											<Checkbox
												checked={checked}
												onChange={(event) =>
													setChecked(
														event.target.checked,
													)
												}
												name="checked"
												color="primary"
												size="small"
											/>
										}
										label={
											<span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
												Keep me signed in
											</span>
										}
									/>
									<Link
										component={RouterLink}
										to=""
										color="text.primary"
										className="text-neutral-800 dark:text-neutral-200"
									>
										Forgot Password?
									</Link>
								</Stack>
							</Grid>

							<Grid item xs={12}>
								<ButtonPrimary
									type="submit"
									className="w-100"
									disabled={showLoader}
								>
									{showLoader ? "Logging in.." : "Login"}
								</ButtonPrimary>
							</Grid>
						</Grid>
					</form>
				)}
			</Formik>
		</>
	);
};

export default LoginForm;
