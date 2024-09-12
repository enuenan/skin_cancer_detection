document.querySelector('.custom-file-input').addEventListener('change', function(e) {
    var fileName = document.getElementById("fileInput").files[0].name;
    var nextSibling = e.target.nextElementSibling
    nextSibling.innerText = fileName
});

document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();
    // Simulate detection process
    var isCancerDetected = Math.random() >= 0.5;
    var resultText = isCancerDetected ? "Yes, skin cancer detected." : "No, skin cancer not detected.";
    document.getElementById("resultText").innerText = resultText;
    var popup = document.getElementById("resultPopup");
    popup.style.display = "block";
});

document.querySelector(".close").onclick = function() {
    var popup = document.getElementById("resultPopup");
    popup.style.display = "none";
}
