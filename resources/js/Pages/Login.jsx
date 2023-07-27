import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/Layouts/Layout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import useTitle from "@/Components/useTitle";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (
            localStorage.getItem("token") != "" &&
            localStorage.getItem("token") != null
        ) {
            navigate("/dashboard");
        }
    }, []);

    const loginAction = (e) => {
        setValidationErrors({});
        e.preventDefault();
        setIsSubmitting(true);
        let payload = {
            email: email,
            password: password,
        };
        axios
            .post("/api/login", payload)
            .then((r) => {
                console.log(r);
                setIsSubmitting(false);
                localStorage.setItem("token", r.data.data.token);
                navigate("/dashboard");
            })
            .catch((e) => {
                setIsSubmitting(false);
                if (e.response.data.errors != undefined) {
                    setValidationErrors(e.response.data.errors);
                }
                if (e.response.data.error != undefined) {
                    setValidationErrors(e.response.data.error);
                }
            });
    };

    useTitle("Sign In");

    return (
        <GuestLayout>
            <h5 className="card-title mb-4">Sign In</h5>
            <form
                onSubmit={(e) => {
                    loginAction(e);
                }}
            >
                {Object.keys(validationErrors).length != 0 && (
                    <p className="text-center ">
                        <small className="text-danger">
                            Incorrect Email or Password
                        </small>
                    </p>
                )}

                <div className="mb-3">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        type="email"
                        className="mt-1 block w-full"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        type="password"
                        className="mt-1 block w-full"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div className="flex items-center justify-end mt-4 gap-4">
                    <p className="">
                        Don't have account? <Link to="/register">Register</Link>
                    </p>
                    <PrimaryButton
                        type="submit"
                        className="ml-4"
                        disabled={isSubmitting}
                    >
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

export default Login;
