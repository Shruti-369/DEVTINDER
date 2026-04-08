const adminAuth = (req, res, next) => {
  console.log("Admin middleware called");

  const token = "xyz";
  const isAdminAuthorized = token === "xyz";

  if (!isAdminAuthorized) {
    return res.status(403).send("Unauthorized");
  }

  next();
};


const userAuth = (req, res, next) => {
  console.log("User middleware called");
  const token = "xyz";
  const isUserAuthorized = token === "xyz";
  if (!isUserAuthorized) {
    return res.status(403).send("Unauthorized");
  } else {
    next();
  }
}; 


module.exports = { adminAuth,
    userAuth,
};