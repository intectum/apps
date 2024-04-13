package com.vaga

import java.util.Calendar

object Dates
{
  fun today(): DateOnly
  {
    val calendar = Calendar.getInstance()

    val dateOnly = DateOnly()
    dateOnly.year = calendar[Calendar.YEAR]
    dateOnly.month = calendar[Calendar.MONTH] + 1
    dateOnly.day = calendar[Calendar.DAY_OF_MONTH]

    return dateOnly
  }
}
