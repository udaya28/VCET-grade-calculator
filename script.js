function getData(regulation, department, semester, callback) {
  let requestURL = 'data.json';
  let request = new XMLHttpRequest();
  request.open('GET', requestURL, true);
  request.responseType = 'json';
  request.send();
  request.onload = function () {
    const rawData = request.response;
    const data = rawData[regulation][department][semester];
    callback(data);
  };
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
  console.log(totalSemesters);
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
    <input class="form-control sem-sgpa" type="text" value="" inputmode="decimal" placeholder="00.00" />
  </div>
</div>`;
  }
  html +=
    '<button type="button" class="btn btn-secondary btn-sm btn-block all-button" id="calculate-cgpa1">Calculate CGPA</button><div><div id="result2"></div>';
  html += `</div>`;
  document.getElementById('box1').innerHTML = html;
}

function getCGPA(totalSemesters) {
  let SGPA = document.querySelectorAll('.sem-sgpa');
  console.log(SGPA);
}
