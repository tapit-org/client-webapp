import { Helmet, HelmetProvider } from 'react-helmet-async';
import ThemeRoutes from 'routes';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<HelmetProvider>
			<Helmet>
				<title>Tap-it | Digital Business Cards</title>
				<meta name="description" content="Tap-it | Digital Business Cards" />
			</Helmet>

			{/* MAIN APP */}
			<div className="bg-white text-base dark:bg-slate-900 text-slate-900 dark:text-slate-200">
				<ToastContainer
					position="bottom-right"
					autoClose={4000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				<ThemeRoutes />
			</div>
		</HelmetProvider>
	);
}

export default App;
