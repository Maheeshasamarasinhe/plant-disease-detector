// Predictor Functionality
const fileInput = document.getElementById('file-input');
const preview = document.getElementById('preview');
const resultsDiv = document.getElementById('results');
const predictionList = document.getElementById('prediction-list');

// Drag and drop support
const uploadArea = document.querySelector('.upload-area');

if (uploadArea) {
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--gold)';
        uploadArea.style.backgroundColor = '#f0fde4';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--accent-green)';
        uploadArea.style.backgroundColor = 'var(--very-light-green)';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--accent-green)';
        uploadArea.style.backgroundColor = 'var(--very-light-green)';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            handleFileSelect({ target: { files: files } });
        }
    });
}

fileInput.addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Show image preview
    preview.src = URL.createObjectURL(file);
    preview.style.display = 'block';

    // Prepare data to send to the backend
    const formData = new FormData();
    formData.append('file', file);
    
    // Show loading message
    resultsDiv.classList.add('visible');
    predictionList.innerHTML = '<li><strong>🔄 Analyzing image, please wait...</strong></li>';

    // Send the image to the Flask backend
    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Display the prediction results
        predictionList.innerHTML = '';
        if (data.error) {
            predictionList.innerHTML = `<li style="color: #c62828;"><strong>Error:</strong> ${data.details || data.error}</li>`;
        } else {
            data.predictions.forEach((p, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${p.label}</strong> <span class="confidence">${p.confidence}</span>`;
                predictionList.appendChild(listItem);
            });
        }
    })
    .catch(error => {
        console.error('Fetch Error:', error);
        predictionList.innerHTML = `<li style="color: #c62828;"><strong>Error:</strong> Failed to connect to the server. Please ensure it's running.</li>`;
    });
}
