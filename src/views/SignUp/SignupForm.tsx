import React from "react";
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
import {
	AccountCircleOutlined,
	EmailOutlined,
	LockOutlined,
} from "@mui/icons-material";
// assets
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { auth } from "firebaseConfig";
import {
	User,
	createUserWithEmailAndPassword,
	deleteUser,
} from "firebase/auth";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { createUser } from "services/auth.service";
import { dispatch } from "store";
import { setUser } from "store/reducers/user";
import useBoolState from "hooks/useBoolState";
import OverlayLoader from "components/OverlayLoader";

// ============================|| FIREBASE - LOGIN ||============================ //

const SignupForm = ({ callback = null }) => {
	const navigate = useNavigate();
	const [showLoader, toggleShowLoader] = useBoolState(false);
	const validatePassword = (password: string, confirmPassword: string) => {
		let isValid = true;
		if (password !== "" && confirmPassword !== "") {
			if (password !== confirmPassword) {
				isValid = false;
			}
		}
		return isValid;
	};

	const handleCreateAccount = async (
		name: string,
		email: string,
		password: string,
		confirmPassword: string,
	) => {
		let passwordValid = validatePassword(password, confirmPassword);
		if (!passwordValid) {
			toast.error("Passwords do not match");
			return;
		}
		try {
			toggleShowLoader();
			const firebaseRespose = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const accessToken = await firebaseRespose.user.getIdToken();
			localStorage.setItem("access_token", accessToken);
			const user = await createUser(dispatch, firebaseRespose.user, name);
			dispatch(setUser(user));
			toggleShowLoader();
			if (callback) {
				callback();
			} else {
				navigate("/");
			}
		} catch (error) {
			console.log(error.code);
			if (error.code === "auth/email-already-in-use") {
				toast.error("Email already in use.");
			} else if (error.code === "auth/weak-password") {
				toast.error("Password is too weak.");
			} else {
				toast.error("Something went wrong");
			}
			toggleShowLoader();
		}
	};

	return (
		<>
			{showLoader && <OverlayLoader />}
			<Formik
				initialValues={{
					name: "Veer",
					email: "veer1@gmail.com",
					password: "testtest",
					confirmPassword: "testtest",
					submit: null,
				}}
				validationSchema={Yup.object().shape({
					name: Yup.string().max(255).required("Name is required"),
					email: Yup.string()
						.email("Must be a valid email")
						.max(255)
						.required("Email is required"),
					password: Yup.string()
						.max(255)
						.required("Password is required"),
					confirmPassword: Yup.string()
						.max(255)
						.required("Cofnrim Password is required"),
				})}
				onSubmit={async (
					values,
					{ setErrors, setStatus, setSubmitting },
				) => {
					try {
						setStatus({ success: false });
						await handleCreateAccount(
							values.name,
							values.email,
							values.password,
							values.confirmPassword,
						);
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
									<Label>Name</Label>
									<div className="mt-1.5 flex">
										<span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
											<AccountCircleOutlined fontSize="small" />
										</span>
										<Input
											id="name-signup"
											type="text"
											name="name"
											value={values.name}
											className="!rounded-l-none"
											onBlur={handleBlur}
											onChange={handleChange}
											placeholder="Enter Name"
										/>
									</div>
									{touched.name && errors.name && (
										<FormHelperText
											error
											id="standard-weight-helper-text-name-signup"
										>
											{errors.name}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={12}>
								<Stack spacing={1}>
									<Label>Email</Label>
									<div className="mt-1.5 flex">
										<span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
											<EmailOutlined fontSize="small" />
										</span>
										<Input
											id="email-signup"
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
											id="standard-weight-helper-text-email-signup"
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
											id="password-signup"
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
											id="standard-weight-helper-text-password-signup"
										>
											{errors.password}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={12}>
								<Stack spacing={1}>
									<Label>Confirm Password</Label>
									<div className="mt-1.5 flex">
										<span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
											<LockOutlined fontSize="small" />
										</span>
										<Input
											id="confirm-password-signup"
											type="password"
											name="confirmPassword"
											value={values.confirmPassword}
											className="!rounded-l-none"
											onBlur={handleBlur}
											onChange={handleChange}
											placeholder="Enter Password"
										/>
									</div>
									{touched.confirmPassword &&
										errors.confirmPassword && (
											<FormHelperText
												error
												id="standard-weight-helper-text-confirm-password-signup"
											>
												{errors.confirmPassword}
											</FormHelperText>
										)}
								</Stack>
							</Grid>
							<Grid item xs={12}>
								<ButtonPrimary
									type="submit"
									className="w-100"
									disabled={showLoader}
								>
									{showLoader
										? "Creating Account.."
										: "Create Account"}
								</ButtonPrimary>
							</Grid>
						</Grid>
					</form>
				)}
			</Formik>
		</>
	);
};

export default SignupForm;
