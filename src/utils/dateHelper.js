exports.GetCurrentDate = function () {
  const date = new Date()

  const dateParts = {
    Year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate()
  }

  return `${dateParts.Year}/${dateParts.month + 1}/${dateParts.date}`
}
