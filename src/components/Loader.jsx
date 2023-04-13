import React from "react";
import Lottie from "lottie-react";

import loader from "../assets/loader.json";

const Loader = () => <Lottie animationData={loader} loop={true} />;

export default Loader;
