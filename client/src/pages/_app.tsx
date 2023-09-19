import "@/app/globals.css";
import store from "@/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import dotenv from "dotenv";
dotenv.config();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
