module.exports = {
  errorHandler: (err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }

    if (typeof err === 'string') {
      return res.status(400).json({ status: 'error', error: err });
    }

    if (err.name === 'ValidationError') {
      return res.status(400).json({ status: 'error', error: err.message });
    }

    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({
        status: 'error',
        error: 'Unauthorized: Access is denied due to invalid credentials.'
      });
    }

    return res.status(500).json({ status: 'error', error: err.message });
  }
};
