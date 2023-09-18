document.addEventListener("DOMContentLoaded", function() {
    // Get references to the elements
    const selectButton = document.getElementById("selectButton");
    const fileInput = document.getElementById("fileInput");
    const deviceOption = document.getElementById("deviceOption");
    const cameraOption = document.getElementById("cameraOption");
    const cameraModal = document.getElementById("cameraModal");
    const cameraPreview = document.getElementById("cameraPreview");
    const closeCameraModal = document.getElementById("closeCameraModal");

    // Function to handle file input change
    fileInput.addEventListener("change", function(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            // You can process the selected file here, e.g., display it, send it to a server, etc.
            console.log("Selected file:", selectedFile.name);
        }
    });

    // Function to open file dialog for selecting from device
    function selectFromFile() {
        fileInput.value = null; // Reset the input to clear previous selections
        fileInput.click(); // Trigger the file input dialog
    }

    // Function to open the camera modal
    function openCameraModal() {
        cameraModal.style.display = "block";
        // Access the camera stream and display it in the modal
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                cameraPreview.srcObject = stream;
            })
            .catch(function(error) {
                console.error("Camera access denied:", error);
            });
    }

    // Function to close the camera modal
    function closeCamera() {
        cameraModal.style.display = "none";
        // Stop the camera stream
        if (cameraPreview.srcObject) {
            const tracks = cameraPreview.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            cameraPreview.srcObject = null;
        }
    }

    // Add click event listener to the "SELECT" button
    selectButton.addEventListener("click", function() {
        // Determine the user's choice
        if (deviceOption.checked) {
            selectFromFile(); // User chose "Select from device"
        } else if (cameraOption.checked) {
            openCameraModal(); // User chose "Use camera"
        } else {
            alert("Please select an option.");
        }
    });

    // Add click event listener to close the camera modal
    closeCameraModal.addEventListener("click", function() {
        closeCamera();
    });
});