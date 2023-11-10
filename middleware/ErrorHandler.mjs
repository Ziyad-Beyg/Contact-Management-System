import { ErrorCode } from "../utils/Constant.mjs";

const ErrorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case ErrorCode.BAD_REQUEST:
      res.json({
        title: "Validation Failed!",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case ErrorCode.UNAUTHORIZED:
      res.json({
        title: "Unauthorized User!",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case ErrorCode.FORBIDDEN:
      res.json({
        title: "Forbidden Request!",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case ErrorCode.NOT_FOUND:
      res.json({
        title: "Resourse Not Found!",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case ErrorCode.CONFLICT:
      res.json({
        title: "Request Conflict!",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case ErrorCode.INTERNAL_SERVER_ERROR:
      res.json({
        title: "Internal Server Error!",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      res.json({
        title: "Something Went Wrong!",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  }
};

export default ErrorHandler;
