import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const AUTH_PAGES = {
  LOGIN: "login",
  SIGNUP: "signup",
  FOTGOT_PASSWORD: "forgot-password",
} as const;

type ObjectValues<T> = T[keyof T];
type AuthPage = ObjectValues<typeof AUTH_PAGES>;

type FooterProps = {
  page: AuthPage;
};

const Footer: React.FC<FooterProps> = ({ page }) => {
  switch (page) {
    case AUTH_PAGES.LOGIN: {
      return (
        <p className="mt-6 text-center text-sm font-light text-gray-500">
          <span className="pr-1">Don't have an account yet?</span>
          <Link
            to="/signup"
            className="font-medium text-primary-600 hover:underline"
          >
            Signup
          </Link>
        </p>
      );
    }

    case AUTH_PAGES.SIGNUP: {
      return (
        <p className="mt-6 text-center text-sm font-light text-gray-500">
          <span className="pr-1">Already have an account?</span>
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:underline"
          >
            Login
          </Link>
        </p>
      );
    }

    case AUTH_PAGES.FOTGOT_PASSWORD: {
      return (
        <p className="mt-6 text-center text-sm font-light text-gray-500">
          <span className="pr-1">Go back to</span>
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:underline"
          >
            Login
          </Link>
        </p>
      );
    }

    default: {
      return null;
    }
  }
};

type AuthLayoutProps = {
  children: ReactNode;
  description?: string;
  page: AuthPage;
  title: string;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  description,
  page,
  title,
}) => {
  return (
    <div className="bg-gray-50 h-full">
      <div className="flex justify-center items-center h-full">
        <div className="w-full bg-white rounded-lg shadow p-6 lg:px-8 md:mt-0 sm:max-w-md">
          <div className="flex flex-col items-start sm:mx-auto sm:w-full sm:max-w-sm">
            <Link to="/login">
              <Logo className="h-16 w-auto" />
            </Link>

            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              <span>{title}</span>
            </h2>

            {description === undefined ? null : (
              <span className="block mt-4 text-sm text-gray-500">
                {description}
              </span>
            )}
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {children}
          </div>

          <Footer page={page} />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
