const signupForm = [
  {
    label: "First Name",
    name: "fname",
    type: "text",
    placeholder: "Enter first name",
    required: true,
  },
  {
    label: "Last Name",
    name: "lname",
    type: "text",
    placeholder: "Enter last name",
    required: true,
  },
  {
    label: "Email Address",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Create a password",
    required: true,
  },
  {
    label: "Role",
    name: "role",
    type: "select",
    required: true,
    options: [
      { value: "user", label: "Customer" },
      { value: "seller", label: "Seller" },
      // { value: "admin", label: "Admin" }
    ]
  }
];

export default signupForm;
