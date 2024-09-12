import tensorflow as tf
from flask import Flask, request, render_template
# from keras.models import load_model
from PIL import Image
import numpy as np
import os

# Initialize the Flask application
app = Flask(__name__)

# Load the pre-trained Keras model
model = tf.keras.models.load_model('model/skin_cancer_classifier.h5')

# Define the class labels
labels = {0: "No Cancer", 1: "Cancer Detected"}

# Define a function to preprocess the image
def preprocess_image(image_path):
    # Open the image file
    image = Image.open(image_path)
    # Resize the image to 224x224 pixels (match your model input size)
    image = image.resize((224, 224))
    # Convert the image to a NumPy array
    image_array = np.array(image)
    # Normalize the image data (if required by your model)
    image_array = image_array / 255.0
    # Add an additional dimension for batch size
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

# Define the route for the home page
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Check if an image file was uploaded
        if 'file' not in request.files:
            return render_template('index.html', error='No file uploaded')

        file = request.files['file']
        print(file)

        # Ensure the file is an image
        if file.filename == '':
            return render_template('index.html', error='No file selected')

        # Save the uploaded image to a temporary file
        file_path = os.path.join('uploads', file.filename)
        file.save(file_path)

        # Preprocess the image for prediction
        image = preprocess_image(file_path)

        # Make a prediction using the loaded model
        prediction = model.predict(image)

        # Get the class label with the highest probability
        predicted_class = np.argmax(prediction, axis=1)[0]
        result = labels[predicted_class]

        # Remove the temporary image file
        os.remove(file_path)

        # Render the result template
        return render_template('index.html', result=result)

    return render_template('index.html')

if __name__ == '__main__':
    # Run the app
    app.run(debug=True)
