export const checkValidData = (name, email, password) => {
  if (name !== "") {
    const isNameValid = /^[a-zA-Z '.-]*[A-Za-z][^#?!@$%^&*-/]$/.test(name);
    if (!isNameValid) return "Name is not valid";
  }

  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email,
  );

  const isPasswordValid =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password,
    );

  if (!isEmailValid) return "Email is not valid";

  if (!isPasswordValid) return "password is Wrong";

  return null;
};
