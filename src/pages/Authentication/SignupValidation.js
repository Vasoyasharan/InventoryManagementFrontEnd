function Validation(values) {
    let error = {};
    // const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (values.name === "") {
        error.name = "Name should not be empty";
    } else {
        error.name = "";
    }

    // if (values.email === "") {
    //   error.email = "Email should not be empty";
    // } else if (!email_pattern.test(values.email)) {
    //   error.email = "Email didn't match";
    // } else {
    //   error.email = "";
    // }

    if (values.password === "") {
        error.password = "Password should not be empty";
    } else {
        error.password = "";
    }
    return error;
}

export default Validation;
