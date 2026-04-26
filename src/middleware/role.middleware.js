// check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied: Admin only"
    });
  }
  next();
};

// allow admin 
const isOwnerOrAdmin = (model) => {
  return async (req, res, next) => {
    try {
      const item = await model.findByPk(req.params.id);

      if (!item) {
        return res.status(404).json({ message: "Resource not found" });
      }

      // admin can access everything
      if (req.user.role === "admin") {
        return next();
      }

      // check ownership
      if (item.userId !== req.user.id) {
        return res.status(403).json({
          message: "Access denied: Not your resource"
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  isAdmin,
  isOwnerOrAdmin,
};