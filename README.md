# Plant Disease Detector 🌱

A web application that uses AI to detect plant diseases from leaf images. Built with Flask and TensorFlow.

## Features

- 🔍 **AI-Powered Detection**: Advanced neural network for accurate disease identification
- 📱 **User-Friendly Interface**: Simple upload and instant results
- 🌿 **Multiple Plant Types**: Supports 35+ different plant species
- ⚡ **Real-Time Processing**: Get results in seconds
- 📊 **Confidence Scores**: Detailed prediction accuracy metrics

## Screenshots

![AgriHealth Interface](static/hero-background.png)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/plant-disease-detector.git
cd plant-disease-detector
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python backend.py
```

4. Open your browser and go to `http://127.0.0.1:5000`

## Usage

1. Navigate to the Predictor page
2. Upload an image of a plant leaf
3. Get instant AI-powered disease detection results
4. View confidence scores and disease classifications

## Technology Stack

- **Backend**: Flask (Python)
- **AI/ML**: TensorFlow, Keras
- **Frontend**: HTML, CSS, JavaScript
- **Image Processing**: PIL (Pillow)

## Model Information

- **Architecture**: Convolutional Neural Network (CNN)
- **Accuracy**: 99.2%
- **Supported Diseases**: 100+ classifications
- **Input Size**: 128x128 pixels

## Project Structure

```
plant-disease-detector/
├── backend.py              # Flask application
├── trained_model.h5        # Pre-trained AI model
├── class_names.json        # Disease class labels
├── requirements.txt        # Python dependencies
├── static/                 # Static assets (images)
├── templates/              # HTML templates
│   ├── index.html         # Main application page
│   ├── css/               # Stylesheets
│   └── js/                # JavaScript files
└── README.md              # Project documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- TensorFlow team for the machine learning framework
- Plant disease dataset contributors
- Flask community for the web framework