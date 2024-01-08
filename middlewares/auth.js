
export const isAuthenticated = async (req, res, next) => {
  try {

    const googletoken = req.cookies["connect.sid"];

    if (googletoken) {
      return next()
    }

    return res.status(500).json({
      success: false,
      message: "Login First",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
