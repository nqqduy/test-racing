export class Response {
  static Success(data: any, code = 200, message = "Successfully!") {
    return {
      result: true,
      message,
      data,
    };
  }
}
