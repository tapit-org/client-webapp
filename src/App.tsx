import { Helmet, HelmetProvider } from "react-helmet-async";
import ThemeRoutes from "routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "firebaseConfig";
import { dispatch } from "store";
import { removeUser } from "store/reducers/user";
function App() {
	const { palette } = createTheme();
	const { augmentColor } = palette;
	const createColor = (mainColor) =>
		augmentColor({ color: { main: mainColor } });
	const theme = createTheme({
		palette: {
			primary: createColor("#F5B058"),
		},
	});
	return (
		<HelmetProvider>
			<Helmet>
				<title>Tap-it | Digital Business Cards</title>
				<meta
					name="description"
					content="Tap-it | Digital Business Cards"
				/>
			</Helmet>
			{/* MAIN APP */}
			<div className="bg-white text-base dark:bg-slate-900 text-slate-900 dark:text-slate-200">
				<ToastContainer
					position="top-center"
					autoClose={4000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				<ThemeProvider theme={theme}>
					<ThemeRoutes />
				</ThemeProvider>
			</div>
		</HelmetProvider>
	);
}

export default App;
