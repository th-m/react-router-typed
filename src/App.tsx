import { BrowserRouter } from "react-router-dom";
import { PageRouter } from "./PageRouter";
export default function App() {
  return (
    <BrowserRouter>
      <PageRouter />
    </BrowserRouter>
  );
}
