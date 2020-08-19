function getData(regulation, department, semester, callback) {
  // let requestURL = 'data.json';
  // let request = new XMLHttpRequest();
  // request.open('GET', requestURL, true);
  // request.responseType = 'json';
  // request.send();
  // request.onload = function () {
  //   const rawData = request.response;
  //   const data = rawData[regulation][department][semester];
  //   callback(data);
  // };
  const data = json[regulation][department][semester];
  callback(data);
}

function putHTML(data) {
  let html = `
  <div class="">
  <div class="row">
    <div class="col-8 head">Subject</div>
    <div class="col-2 head">Credit</div>
    <div class="col-2 head">Grade</div>
  </div>`;
  for (let i = 0; i < data.subject.length; i++) {
    html += `
  <div class="row">
    <div class="col col-8">
      <input type="text" class="form-control" value="${data.subject[i].subject}" disabled/>
    </div>
    <div class="col col-2 col-x">
      <select class="form-control" value="${data.subject[i].credit}" disabled>
        <option value="${data.subject[i].credit}">${data.subject[i].credit}</option>
      </select>
    </div>
    <div class="col col-2 col-x">
      <select class="form-control" id="grade">
        <option value = 10 >O</option>
        <option value = 9 >A+</option>
        <option value = 8 >A</option>
        <option value = 7 >B</option>
        <option value = 6 >B+</option>
        <option value = 0 >RA</option>
        <option value = 0>AB</option>
      </select>
    </div>
  </div>`;
  }
  html +=
    '<button type="button" class="btn btn-secondary btn-sm btn-block all-button" id="calculate-sgpa">Calculate SGPA</button><div><div id="result"></div>';
  const box = document.getElementById('box');
  box.innerHTML = html;
  document
    .getElementById('calculate-sgpa')
    .addEventListener('click', function () {
      var credit_arr = [];
      var grade_arr = [];
      var SGPA = 0;
      data.subject.forEach((subject) => {
        credit_arr.push(subject.credit);
      });
      // console.log(credit_arr);
      const userInput = document.querySelectorAll('#grade');
      userInput.forEach((x) => {
        grade_arr.push(Number(x.value));
      });
      // console.log(grade_arr);
      SGPA = getResult(credit_arr, grade_arr, data['total-credit']);

      const result = document.getElementById('result');
      result.innerHTML = `<div class="alert alert-success" role="alert" id="result">
      Semester Grade Point Average (SGPA) is
      <span class="alert-link">${SGPA}</span>
    </div>`;
    });
}

function roundToTwo(num) {
  return +(Math.round(num + 'e+2') + 'e-2');
}

function getResult(credit, grade, totalCredit) {
  var result = 0.0,
    points = 0;
  for (let i = 0; i < credit.length; i++) {
    points += credit[i] * grade[i];
  }

  result = roundToTwo(points / totalCredit);
  if (isNaN(result)) {
    result = 0;
  }
  return result;
}

//section 1
document.getElementById('calculate').addEventListener('click', function () {
  let regulation = document.getElementById('regulation').value;
  let department = document.getElementById('department').value;
  let semester = document.getElementById('semester').value;
  // console.log(regulation, department, semester);
  var data = getData(regulation, department, semester, putHTML);
});

//section 2
document.getElementById('calculate-cgpa').addEventListener('click', () => {
  let totalSemesters = document.getElementById('completed-semester').value;
  renderSemesters(totalSemesters);
  document.getElementById('calculate-cgpa1').addEventListener('click', () => {
    getCGPA(totalSemesters);
  });
});

function renderSemesters(sem) {
  let html = `
  <div class="row">
    <div class="col-8 head">Semester</div>
    <div class="col-4 head">SGPA</div>
  </div>`;
  for (let i = 1; i <= sem; i++) {
    html += `<div class="row">
  <div class="col-8"><label>Semester ${i}</label></div>
  <div class="col-4">
    <input class="form-control sem-sgpa" type="text" value="" inputmode="decimal"  />
  </div>
</div>`;
  }
  html +=
    '<div id="alert-own"></div><button type="button" class="btn btn-secondary btn-sm btn-block all-button" id="calculate-cgpa1">Calculate CGPA</button><div><div id="result2"></div>';
  html += `</div>`;
  document.getElementById('box1').innerHTML = html;
}

function getCGPA(totalSemesters) {
  let SGPA = document.querySelectorAll('.sem-sgpa');
  // console.log(SGPA);
  const arrSGPA = [];
  let flag = true;
  for (let i = 0; i < totalSemesters; i++) {
    let val = SGPA[i].value;
    if (val == '') {
      showAlertInvalid('Every field must to be filled');
      flag = false;
      break;
    } else {
      if (val < 0.0 || val > 10.0) {
        showAlertInvalid('SGPA must between 0.0 to 10.0');
        flag = false;
        break;
      } else {
        arrSGPA.push(Number(val));
      }
    }
  }
  if (flag) {
    let totalSGPA = 0;
    arrSGPA.forEach((x) => {
      totalSGPA += x;
    });
    let CGPA = roundToTwo(totalSGPA / totalSemesters);

    const result = document.getElementById('result2');
    result.innerHTML = `<div class="alert alert-success" role="alert" id="result">
    Cumulative Grade Point Average (CGPA) is
      <span class="alert-link">${CGPA}</span>
    </div>`;
  }
}

function showAlertInvalid(str) {
  let html = `<div class="alert alert-danger">
  <strong>${str}</strong>
</div>`;
  document.getElementById('alert-own').innerHTML = html;
  setTimeout(() => {
    document.getElementById('alert-own').innerHTML = '';
  }, 4000);
}

//data
const json = {
  'R-2018': {
    CSE: {
      '1': {
        'total-credit': 22,
        subject: [
          { subject: 'Communicative English - I', credit: 3 },
          { subject: 'Engineering Mathematics - I', credit: 4 },
          { subject: 'Engineering Physics', credit: 3 },
          { subject: 'Engineering Chemistry', credit: 3 },
          { subject: 'Problem Solving and Python Programming', credit: 3 },
          { subject: 'Engineering Graphics', credit: 4 },
          { subject: 'Physics and Chemistry Laboratory - I', credit: 1 },
          {
            subject: 'Problem Solving and Python Programming Laboratory ',
            credit: 1,
          },
          { subject: 'Value Education for Youth Empowerment', credit: 0 },
        ],
      },
      '2': {
        'total-credit': 19,
        subject: [
          { subject: 'Communicative English - II', credit: 3 },
          { subject: 'Engineering Mathematics - II', credit: 4 },
          { subject: 'Physics for Information Sciences', credit: 3 },
          {
            subject: 'Basic of Electrical and Electronics Engineering',
            credit: 3,
          },
          { subject: 'Programming in C', credit: 3 },
          { subject: 'Physics and Chemistry Laboratory - II', credit: 1 },
          {
            subject: 'C Programming Laboratory ',
            credit: 1,
          },
          {
            subject: 'Engineering Practices Laboratory ',
            credit: 1,
          },
          { subject: 'Environmental Science and Engineering', credit: 0 },
        ],
      },
      '3': {
        'total-credit': 19,
        subject: [
          { subject: 'Discrete Mathematics', credit: 4 },
          { subject: 'Object Oriented Programming using Java', credit: 3 },
          { subject: 'Data structures', credit: 3 },
          { subject: 'Digital Principles and System Design', credit: 4 },
          { subject: 'Computer Architecture', credit: 3 },
          { subject: 'Object Oriented Programming Laboratory', credit: 1 },
          {
            subject: 'Data structures Laboratory ',
            credit: 1,
          },
          {
            subject: 'Essential English For Professionals',
            credit: 0,
          },
        ],
      },
      '4': {
        'total-credit': 23,
        subject: [
          { subject: 'Probability and Statistics', credit: 4 },
          { subject: 'Database Management System', credit: 3 },
          { subject: 'Software Engineering', credit: 3 },
          { subject: 'Operating System', credit: 3 },
          { subject: 'Design and Analysis of Algorithms', credit: 4 },
          { subject: 'Object Oriented Analysis and Design', credit: 4 },
          {
            subject: 'Database Management System Laboratory',
            credit: 1,
          },
          {
            subject: 'Operating System Laboratory',
            credit: 1,
          },
          {
            subject: 'Professional Communication',
            credit: 0,
          },
        ],
      },
      '5': {
        'total-credit': 22,
        subject: [
          { subject: 'Computer Networks', credit: 3 },
          { subject: 'Web Programming', credit: 3 },
          { subject: 'Theory of Computations', credit: 4 },
          { subject: 'Microprocessor and Microcontroller', credit: 4 },
          { subject: 'Professional Elective - I', credit: 3 },
          { subject: 'Open Elective - I', credit: 3 },
          {
            subject: 'Computer Networks Laboratory',
            credit: 1,
          },
          {
            subject: 'Web Programming Laboratory',
            credit: 1,
          },
          {
            subject: 'Aptitude and Logical Reasoning',
            credit: 0,
          },
          {
            subject: 'Communication Skills Laboratory',
            credit: 0,
          },
        ],
      },
      '6': {
        'total-credit': 23,
        subject: [
          { subject: 'Artificial Intelligence', credit: 3 },
          { subject: 'Compiler Design', credit: 4 },
          { subject: 'Mobile Application Development', credit: 3 },
          { subject: 'Internet of Things', credit: 3 },
          { subject: 'Professional Elective - II', credit: 3 },
          { subject: 'Professional Elective - III', credit: 3 },
          {
            subject: 'Mobile Application Development Laboratory',
            credit: 1,
          },
          {
            subject: 'Mini Project',
            credit: 3,
          },
          {
            subject: 'Professional Ethics for Engineers',
            credit: 0,
          },
          {
            subject: 'Arithmetic and Analytical Ability',
            credit: 0,
          },
        ],
      },
      '7': {
        'total-credit': 18,
        subject: [
          { subject: 'Economics and Management for Engineers', credit: 3 },
          { subject: 'Network Security', credit: 3 },
          { subject: 'Machine Learning', credit: 3 },
          { subject: 'Professional Elective - IV', credit: 3 },
          { subject: 'Open Elective - II', credit: 3 },
          {
            subject: 'Network Security Laboratory',
            credit: 1,
          },
          {
            subject: 'Internship/ Value Added Practical Courses',
            credit: 2,
          },
          {
            subject: 'Indian Constitution and Traditional Knowledge',
            credit: 0,
          },
        ],
      },
      '8': {
        'total-credit': 16,
        subject: [
          { subject: 'Professional Elective - V', credit: 3 },
          { subject: 'Professional Elective - VI', credit: 3 },
          { subject: 'Project Work', credit: 10 },
        ],
      },
    },
  },
  'R-2016': {
    hhi: 444,
  },
};
