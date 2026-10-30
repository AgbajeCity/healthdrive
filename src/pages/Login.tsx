import NotAvailableNotice from "@/components/NotAvailableNotice";

const Login = () => (
  <NotAvailableNotice
    title="Register / Log In"
    notice="Account creation is not open yet. There are no user accounts to log in to."
    path="/login"
  />
);

export default Login;
