import RegisterForm from "./RegisterForm";
import { Link } from "react-router";

function AuthPage() {
    return <div>
        <RegisterForm />
        <Link to="/" className="underline text-blue-600 hover:text-blue-700">Go to main page</Link>
    </div>;
}

export default AuthPage;