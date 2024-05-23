import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Footer, Navbar } from "@/widgets/layout";
import routes from "@/router/routes";
import AuthProvider from "./context/AuthProvider";
import HttpHeadersProvider from "./context/HttpHeadersProvider";


function App() {
  const { pathname } = useLocation();

  return (
    <>
            <AuthProvider>
          <HttpHeadersProvider>
      {
        <div className="container absolute left-2/4 z-50 mx-auto -translate-x-2/4 p-1 h-16">
          <Navbar routes={routes} />
        </div>
      
      }
    
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
     
      {
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Footer/>
        </div>
      
      }
                </HttpHeadersProvider>
        </AuthProvider>
    </>
  );
}

export default App;
