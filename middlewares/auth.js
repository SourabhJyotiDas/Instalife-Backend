
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies["connect.sid"];
    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Not LogedIn",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
