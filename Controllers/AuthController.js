const User = require("../Models/User");

const getDetails = async (req, res) => {
  try {
    const { auth0Id, email, name } = req.body;
    console.log(req.body);
    let user = await User.findOne({ auth0Id }).populate({
      path: "todos",
      options: { sort: { order: 1 } }, // Sort todos by the 'order' field in ascending order
    });
    console.log(user);
    if (!user) {
      user = new User({
        auth0Id,
        email,
        name,
      });
      await user.save();
    }

    user = await User.findOne({ auth0Id }).populate("todos");
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getDetails,
};
