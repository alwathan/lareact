import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import useTitle from "@/Components/useTitle";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        if (
            localStorage.getItem("token") == "" ||
            localStorage.getItem("token") == null
        ) {
            navigate("/");
        } else {
            getUser();
        }
    }, []);

    const getUser = () => {
        axios
            .get("/api/me", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((r) => {
                console.log(r);
                setUser(r.data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useTitle("Dashboard");

    return (
        <AuthenticatedLayout user={user} header="Dashboard">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <h2 className="text-center">Welcome, {user.name}!</h2>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;
