var file = document.querySelector('input[type=file]');
var submitBtn = document.querySelector('.submit')
var resubmitBtn = document.querySelector('.resubmit')

var img = document.createElement('img');

var payload = {}
var uploadedResult;

var submitHandler = function(e){
  e.preventDefault()
  var xhr = new XMLHttpRequest()

  // enable reglitching of images
  if (img.src && e.target.classList.contains('resubmit')) {
    payload.content = img.src;
  } else {
    payload.content = uploadedResult;
  }

  xhr.onreadystatechange = function(){
    var parsed;
    resubmitBtn.style.display = "inline";
    if (xhr.readyState === 4) {
      parsed = JSON.parse(xhr.responseText)
      img.src = parsed.content;
    }
  }
  xhr.open('POST', '/service')
  xhr.setRequestHeader('Content-Type', 'application/json')
  if (payload.content) xhr.send(JSON.stringify(payload));
}

var fileHandler = function(e) {
  var reader = new FileReader()

  reader.onloadend = function() {
    resubmitBtn.style.display = "none";
    document.querySelector('header').appendChild(img);
    uploadedResult = reader.result;
    img.src = reader.result
  }

  if (!~e.target.files[0].type.indexOf("image")) {
    alert('Nah, this is for images');
  } else {
    reader.readAsDataURL(e.target.files[0]);
  }
}

submitBtn.addEventListener('click', submitHandler);
resubmitBtn.addEventListener('click', submitHandler);
file.addEventListener('change', fileHandler);
