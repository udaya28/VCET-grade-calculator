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
function getHTML(data) {
  // data.subject.forEach(subject => {
  //     console.log(subject.subject)
  // });
  let html = `
  <div class="calculator container">
  <div class="row">
    <div class="col-6">subject</div>
    <div class="col-3">credit</div>
    <div class="col-3">grade</div>
  </div>`;
  for (let i = 0; i < data.subject.length; i++) {
    console.log(data.subject[i].credit);

    html += `
  <div class="row">
    <div class="col col-6">
      <input type="text" class="form-control" value="${data.subject[i].subject}" disabled/>
    </div>
    <div class="col col-3">
      <select class="form-control" value="${data.subject[i].credit}" disabled>
        <option value="${data.subject[i].credit}">${data.subject[i].credit}</option>
      </select>
    </div>
    <div class="col col-3">
      <select class="form-control">
        <option>O</option>
        <option>A+</option>
        <option>A</option>
        <option>B</option>
        <option>B+</option>
        <option>RA</option>
        <option>AB</option>
      </select>
    </div>
  </div>`;
  }
  html += '<button type="button" class="btn btn-secondary btn-sm btn-block calculate-sgpa" id="calculate">Calculate SGPA</button><div>';
  const box = document.getElementById('box');
  box.innerHTML = html;
}
document.getElementById('calculate').addEventListener('click', function () {
  let regulation = document.getElementById('regulation').value;
  let department = document.getElementById('department').value;
  let semester = document.getElementById('semester').value;
  console.log(regulation, department, semester);
  var data = getData(regulation, department, semester, getHTML);
});
