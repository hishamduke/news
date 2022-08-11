const logout = async () => {
  let val = await axios.get("/api/auth/logout");
  Router.push("/login");
};
