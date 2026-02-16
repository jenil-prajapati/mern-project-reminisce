import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) return res.status(401).json({ message: "Authentication required" });

    try {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedData?.id;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default auth; 