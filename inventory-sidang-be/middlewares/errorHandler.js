const errorHandler = (err, req, res, next) => {
    res.status(err.code || 500).json({
        message: err.message || 'internal server error',
      });
}
// const customError = new Error('Attendance Not Found');
//         customError.code = 404;
//         throw customError;

module.exports = errorHandler