import userModel from '../models/userModel.js';

export const addToCart = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await userModel.findById(req.user.id);
    user.cartData[id] += 1;
    await userModel.findByIdAndUpdate(
      { _id: req.user.id },
      { cartData: user.cartData }
    );
    res
      .status(200)
      .json({ success: true, message: 'added to cart', error: false });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
export const removeFromCart = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await userModel.findById(req.user.id);
    if (user.cartData[id] > 0) {
      user.cartData[id] -= 1;
      await userModel.findByIdAndUpdate(
        { _id: req.user.id },
        { cartData: user.cartData }
      );
    }
    res
      .status(200)
      .json({ success: true, message: 'item removed from cart', error: false });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const listCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    res.status(200).json({ success: true, data: user.cartData });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  } 
}