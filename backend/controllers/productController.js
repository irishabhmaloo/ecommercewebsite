// APIs

// getting all products
exports.getAllProducts = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Route is working fine"
    })
};