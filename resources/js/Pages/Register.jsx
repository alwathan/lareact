import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/Layouts/Layout";
import GuestLayout from "@/Layouts/GuestLayout";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import useTitle from "@/Components/useTitle";

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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

    const registerAction = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        let payload = {
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
        };
        axios
            .post("/api/register", payload)
            .then((r) => {
                setIsSubmitting(false);
                localStorage.setItem("token", r.data.token);
                navigate("/dashboard");
            })
            .catch((e) => {
                setIsSubmitting(false);
                if (e.response.data.errors != undefined) {
                    setValidationErrors(e.response.data.errors);
                }
            });
    };

    useTitle("Register");

    return (
        <GuestLayout>
            <div className="row justify-content-md-center mt-5">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Register</h5>
                            <form onSubmit={(e) => registerAction(e)}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="name"
                                        className="form-label"
                                    >
                                        Name
                                    </label>
                                    <TextInput
                                        type="text"
                                        className="mt-1 block w-full"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    />
                                    {validationErrors.name != undefined && (
                                        <div className="flex flex-col">
                                            <small className="text-danger">
                                                {validationErrors.name[0]}
                                            </small>
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email address
                                    </label>
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
                                    {validationErrors.email != undefined && (
                                        <div className="flex flex-col">
                                            <small className="text-danger">
                                                {validationErrors.email[0]}
                                            </small>
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <TextInput
                                        type="password"
                                        className="mt-1 block w-full"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    {validationErrors.password != undefined && (
                                        <div className="flex flex-col">
                                            <small className="text-danger">
                                                {validationErrors.password[0]}
                                            </small>
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="confirm_password"
                                        className="form-label"
                                    >
                                        Confirm Password
                                    </label>
                                    <TextInput
                                        type="password"
                                        className="mt-1 block w-full"
                                        id="confirm_password"
                                        name="confirm_password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-end mt-4 gap-4">
                                    <p className="text-center">
                                        Have already an account?{" "}
                                        <Link to="/">Login</Link>
                                    </p>
                                    <PrimaryButton
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                    >
                                        Register Now
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

export default Register;
