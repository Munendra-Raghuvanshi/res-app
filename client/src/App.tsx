import Login from "./auth/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./auth/SignUp";
import Forgotpassword from "./auth/forgotpassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/Varifyemail";
import HereSection from "./components/HereSection";
import MainLayout from "./layout/MainLayout";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Restaurentdetail from "./components/restaurentdetail";
import Cart from "./components/Cart";
import Restaurent from "./admin/restaurent";
import AddMenu from "./admin/AddMenu";
import Order from "./admin/Order";
import Success from "./components/Success";
import { useUserstore } from "./store/useUserstore";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "./components/ui/loading";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserstore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};
const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserstore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};
const AdminRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserstore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <HereSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:text",
        element: <Search />,
      },
      {
        path: "/restaurant/:id",
        element: <Restaurentdetail />,
      },
      {
        path: "/Cart",
        element: <Cart />,
      },
      {
        path: "/Order/status",
        element: <Success />,
      },
      /// Admin Server Start From here
      {
        path: "/admin/restaurent",
        element: (
          <AdminRoutes>
            <Restaurent />
          </AdminRoutes>
        ),
      },
      {
        path: "/admin/Addmenu",
        element: (
          <AdminRoutes>
            <AddMenu />
          </AdminRoutes>
        ),
      },
      {
        path: "/admin/Order",
        element: (
          <AdminRoutes>
            <Order />
          </AdminRoutes>
        ),
      },
    ],
  },
  ///api implantation for Authentication

  {
    path: "/Login",
    element: (
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/SignUp",
    element: (
      <AuthenticatedUser>
        <SignUp />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/forgotpassword",
    element: (
      <AuthenticatedUser>
        <Forgotpassword />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/ResetPassword",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);
function App() {
  const { checkAuthentication, isCheckingAuth } = useUserstore();
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);
  if (isCheckingAuth) return <Loading />;
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
}

export default App;
