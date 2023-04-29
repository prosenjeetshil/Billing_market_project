import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin_dashboard () {
    const navigate = useNavigate();
    const Dashboard = () => {
const [authenticated, setauthenticated] = useState(null);
useEffect(() => {
const loggedInUser = localStorage.getItem("authenticated");
if (loggedInUser) {
setauthenticated(loggedInUser);
}
}, []);

if (!authenticated) {
    return <navigate replace to="/login" />;
} else {
return (
<div>
<p>Welcome to your Dashboard</p>
</div>
);
}
};
}

export default Admin_dashboard;