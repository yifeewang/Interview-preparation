// 求两个日期中间的有效日期,笔试的时候for的一个;手抖写成了:,monthArr的声明没写成let,习惯性写了const
// in：2020-9-29，2020-10-3
// out：['2020-9-29','2020-9-30','2020-10-1','2020-10-2','2020-10-3']

function deal(dateA, dateB) {
  let arr = [];
  let [yearA, monthA, dayA] = dateA.split("-");
  yearA = parseInt(yearA);
  monthA = parseInt(monthA);
  dayA = parseInt(dayA);
  let [yearB, monthB, dayB] = dateB.split("-");
  yearB = parseInt(yearB);
  monthB = parseInt(monthB);
  dayB = parseInt(dayB);
  for (let year = yearA; year <= yearB; year++) {
    let monthArr = [];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      monthArr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else {
      monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    let monStart = year === yearA ? monthA : 1;
    let monEnd = year === yearB ? monthB : 12;
    for (let month = monStart; month <= monEnd; month++) {
      let dayStart = year === yearA && month === monthA ? dayA : 1;
      let dayEnd =
        year === yearB && month === monthB ? dayB : monthArr[month - 1];
      for (let day = dayStart; day <= dayEnd; day++) {
        arr.push(`${year}-${month}-${day}`);
      }
    }
  }

  return arr;
}

console.log(deal("2020-9-29", "2020-10-3"));
