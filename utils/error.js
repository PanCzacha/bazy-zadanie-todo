class tooShortError extends Error {
}
class tooLongError extends Error {
}
class noIdError extends Error {
}
class notFoundError extends Error {
}

function handleError(err, req, res, next) {
  if (err instanceof tooShortError) {
    res
      .status(404)
      .render("error", {
        message: "Todo title should be at least 5 characters long.",
      })
  }
  else if (err instanceof tooLongError) {
    res
      .status(400)
      .render("error", {
        message: "Todo title should be at most 150 characters long",
      })
  }
  else if(err instanceof noIdError) {
    res
      .status(404)
      .render("error", {
        message: "Todo not found",
      })
  }
  else if (err instanceof notFoundError) {
    res
      .status(404)
      .render("error", {
        message: "404 - Page not found",
      })
  }
  else {
    res
      .status(500)
      .render("error", {
        message: "Something went wrong, we are working on it"
      })
  }
}

function handle404 (req, res) {
  res
    .status(404)
    .render("error", {
      message: "404 - Page not found",
    })
}

module.exports = {
  tooShortError,
  tooLongError,
  noIdError,
  notFoundError,
  handleError,
  handle404,
}
