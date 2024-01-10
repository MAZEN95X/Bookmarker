var sitename = document.getElementById("sitename");
var siteurl = document.getElementById("siteurl");
var submitbtn = document.getElementById("submitbtn");
var searchinput = document.getElementById("searchsite");
var editbtn = document.getElementById("editbtn");
var content = document.getElementById("tabledata");
var closebtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");
var bookmarks = [];
var fake;
if (localStorage.getItem("bookmarkers") != null) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarkers"));
  showData();
}
function addbookmark() {
  if (
    validate(sitename, nameRegex) == true &&
    validate(siteurl, urlRegex) == true
  ) {
    var bookmark = {
      name: sitename.value,
      url: siteurl.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarkers", JSON.stringify(bookmarks));
    showData();
    clear();
    sitename.classList.remove("is-valid");
    siteurl.classList.remove("is-valid");
  } else {
    boxModal.classList.remove("d-none");
  }
}
function showData() {
  var temp = "";
  for (var i = 0; i < bookmarks.length; i++) {
    temp += `<tr>
    <td>${i + 1}</td>
    <td>${bookmarks[i].name}</td>
<td><button type="button" class="btn btn-info" onclick="validurl(${i})">Visit</button></td>
    <td>
    <button type="button" onclick="updatebookmark(${i})" class="btn btn-success">
      Update
    </button>
  </td>
  <td>
    <button type="button" onclick="deletebookmark(${i})" class="btn btn-danger">
      Delete
    </button>
  </td>
</tr>`;
  }
  content.innerHTML = temp;
}
function deletebookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarkers", JSON.stringify(bookmarks));
  showData();
}
function clear() {
  sitename.value = "";
  siteurl.value = "";
}
function updatebookmark(i) {
  sitename.value = bookmarks[i].name;
  siteurl.value = bookmarks[i].url;
  submitbtn.style.display = "none";
  editbtn.style.display = "inline-block";
  fake = i;
}
function editdata() {
  if (
    validate(sitename, nameRegex) == true &&
    validate(siteurl, urlRegex) == true
  ) {
    bookmarks[fake].name = sitename.value;
    bookmarks[fake].url = siteurl.value;
    localStorage.setItem("bookmarkers", JSON.stringify(bookmarks));
    showData();
    clear();
    submitbtn.style.display = "inline-block";
    editbtn.style.display = "none";
    sitename.classList.remove("is-valid");
    siteurl.classList.remove("is-valid");
  }
}
function search() {
  var temp = "";
  var searchval = searchinput.value.toLowerCase();
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].name.toLowerCase().includes(searchval) == true) {
      temp =
        temp +
        `
        <tr>
                <td>${i + 1}</td>
                <td>${bookmarks[i].name
                  .toLowerCase()
                  .replace(
                    searchval,
                    `<span class= bg-info >${searchval}</span>`
                  )}</td>
    <td><button type="button" class="btn btn-info" onclick="validurl(${i})">Visit</button></td>
                <td>
                <button type="button" onclick="updatebookmark(${i})" class="btn btn-success">
                Update
                </button>
                </td>
                <td>
                <button type="button" onclick="deletebookmark(${i})" class="btn btn-danger">
                Delete
              </button>
              </td>
            </tr>
            `;
    }
    content.innerHTML = temp;
  }
}
var nameRegex = /^\w{3,}(\s+\w+)*$/;
sitename.addEventListener("change", function () {
  validate(sitename, nameRegex);
});
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
siteurl.addEventListener("change", function () {
  validate(siteurl, urlRegex);
});
function validate(element, regex) {
  if (regex.test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
function closeModal() {
  boxModal.classList.add("d-none");
}

closebtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeModal();
  }
});
function validurl(i) {
  var sitevisit = /^https?:\/\//;
  if (sitevisit.test(bookmarks[i].url)) {
    window.open(bookmarks[i].url, "_blank");
  } else {
    window.open(`https://${bookmarks[i].url}`, "_blank");
  }
}
