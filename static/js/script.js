document.querySelector('.custom-file-input').addEventListener('change', function (e) {
    var fileName = document.getElementById("fileInput").files[0].name;
    var nextSibling = e.target.nextElementSibling
    nextSibling.innerText = fileName
});

// document.getElementById("uploadForm").addEventListener("submit", function (event) {
//     event.preventDefault();
//     // Simulate detection process
//     var isCancerDetected = Math.random() >= 0.5;
//     var resultText = isCancerDetected ? "Yes, skin cancer detected." : "No, skin cancer not detected.";
//     document.getElementById("resultText").innerText = resultText;
//     var popup = document.getElementById("resultPopup");
//     popup.style.display = "block";
// });

// document.querySelector(".close").onclick = function () {
//     var popup = document.getElementById("resultPopup");
//     popup.style.display = "none";
// }

document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
    const fileLabel = document.querySelector('.custom-file-label');

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                preview.src = e.target.result;
                preview.style.display = 'block';  // Show the preview
            };

            reader.readAsDataURL(file);

            // Update label text
            fileLabel.textContent = file.name;
        } else {
            preview.style.display = 'none';  // Hide the preview if no file is selected
            fileLabel.textContent = 'Choose file';
        }
    });
});


