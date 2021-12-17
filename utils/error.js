class valError extends Error {
};

class NotFoundError extends Error {
};

function handleError(err, req, res, next) {
  if (err instanceof NotFoundError) {
    res
      .status(404)
      .render("error", {
        message: "Klient o podanym ID nie istnieje."
      })
    return
  }

  console.error(err);

  err instanceof valError ? res.status(400) : res.status(500);

  res.render('error', {
    message: err instanceof valError ? err.message : "Wystąpił nieznany błąd, pracujemy nad jego rozwiązaniem," +
      " spróbuj ponownie za jakiś czas",
  });
}


module.exports = {
  handleError,
  valError,
  NotFoundError,
}
