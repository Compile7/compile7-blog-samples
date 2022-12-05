import React from "react";
import {Link} from "react-router-dom";
const Navbar = () => {
return (
<nav style={{ textAlign: "center", marginTop: "20px" }}>
<Link to="/" style={{ padding: "10px" }}>Landing Page</Link>
<Link to="/public" style={{ padding: "10px" }}>Public</Link>
<Link to="/private" style={{ padding: "10px" }}>Private</Link>
</nav>
);
};
export default Navbar;