import { auth } from "firebaseConfig";
import { createContext } from "react";

console.log("Creating Context");
export const FirebaseAuthContext = createContext(null);
export const FirebaseAuthProvider = ({ children }) => (
	<FirebaseAuthContext.Provider value={auth}>
		{children}
	</FirebaseAuthContext.Provider>
);
export { auth };
