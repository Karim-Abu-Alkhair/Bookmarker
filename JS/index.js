const siteName = document.getElementById("siteName");
const siteURL = document.getElementById("siteURL");
const submitBtn = document.querySelector(".btn-submit");
const tableContent = document.getElementById("tableContent");
const closeBtn = document.querySelector(".close-btn");
const layout = document.querySelector(".layout");

let urlList;

if (!localStorage.getItem("urlList")) {
  urlList = [];
} else {
  urlList = JSON.parse(localStorage.getItem("urlList"));
  display(urlList);
  display(urlList);
}

function createURL() {
  const urlObj = {
    name: siteName.value,
    url: normalizeURL(siteURL.value),
  };

  const isNameValid = nameValidation();
  const isURLValid = urlValidation();

  // If either name or URL is invalid, show an alert
  if (!isNameValid || !isURLValid) {
    layout.classList.remove("d-none");
    return;
  }

  function normalizeURL(url) {
    // Add 'http://' if the URL doesn't start with 'http' or 'https'
    if (!/^https?:\/\//i.test(url)) {
      url = "http://" + url;
    }
    return url;
  }

  urlList.push(urlObj);

  display(urlList);
  localStorage.setItem("urlList", JSON.stringify(urlList));

  clear();
}

function display(list) {
  let row = "";
  for (let i = 0; i < list.length; i++) {
    row += ` 
  <tr>
    <td>${i + 1}</td>
    <td>${list[i].name}</td>
    <td>
    <button class="btn btn-lg btn-success btn-custom-visit fs-4" data-url="${
      list[i].url
    }">
      <i class="fa-solid fa-eye pe-2"></i> Visit
    </button>
    </td>
    <td>
      <button class="btn btn-danger btn-lg fs-4 btn-delete" data-index="${i}">
        <i class="fa-solid fa-trash-can pe-2"></i>Delete
      </button>
    </td>
  </tr>`;
  }

  tableContent.innerHTML = row;

  const deleteButtons = document.querySelectorAll(".btn-delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      deleteURL(e.target.dataset.index);
    });
  });

  const visitButtons = document.querySelectorAll(".btn-custom-visit");
  visitButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const url = e.target.dataset.url;
      window.open(url, "_blank");
    });
  });
}

function clear() {
  siteName.value = "";
  siteURL.value = "";
}

function deleteURL(index) {
  urlList.splice(index, 1);
  display(urlList);
  localStorage.setItem("urlList", JSON.stringify(urlList));
}

function nameValidation() {
  const siteRegex = /^[a-zA-Z]{3,}$/;
  const isNameValid = siteRegex.test(siteName.value);

  if (isNameValid) {
    siteName.classList.replace("is-invalid", "is-valid");
  } else {
    siteName.classList.add("is-invalid");
  }

  return isNameValid;
}

function urlValidation() {
  const urlRegex =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;

  const isURLValid = urlRegex.test(siteURL.value);
  if (isURLValid) {
    siteURL.classList.replace("is-invalid", "is-valid");
  } else {
    siteURL.classList.add("is-invalid");
  }

  return isURLValid;
}

submitBtn.addEventListener("click", createURL);
siteName.addEventListener("input", nameValidation);
siteURL.addEventListener("input", urlValidation);
closeBtn.addEventListener("click", function () {
  layout.classList.add("d-none");
});
