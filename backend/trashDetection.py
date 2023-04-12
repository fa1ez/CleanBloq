# Works on video from webcam
import torch
import numpy
import cv2
from time import time
import json
import os
import os.path
import time as t
from selenium.webdriver.chrome.service import Service
from selenium import webdriver 
from selenium.webdriver.chrome.options import Options 
from selenium.webdriver.common.by import By
from geopy.geocoders import Nominatim
from datetime import datetime

class TrashDetection:
    # Class implements Yolo5 model to make inferences on footage from Camera

    def __init__(self, capture_index, model_name):
        """
        Initializes the class with youtube url and output file.
        :param url: Has to be as youtube URL,on which prediction is made.
        :param out_file: A valid output file name.
        """
        self.capture_index = capture_index
        self.model = self.load_model(model_name)
        self.classes = self.model.names
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
        print("Using Device: ", self.device)

    def get_video_capture(self):
        """
        Creates a new video streaming object to extract video frame by frame to make prediction on.
        :return: opencv2 video capture object, with lowest quality frame available for video.
        """

        return cv2.VideoCapture(self.capture_index)

    def load_model(self, model_name):
        """
        Loads Yolo5 model from pytorch hub.
        :return: Trained Pytorch model.
        """
        if model_name:
            model = torch.hub.load(
                'ultralytics/yolov5', 'custom', path=model_name, force_reload=False)
        else:
            model = torch.hub.load('ultralytics/yolov5',
                                   'yolov5s', pretrained=True)
        return model

    def score_frame(self, frame):
        """
        Takes a single frame as input, and scores the frame using yolo5 model.
        :param frame: input frame in numpy/list/tuple format.
        :return: Labels and Coordinates of objects detected by model in the frame.
        """
        self.model.to(self.device)
        frame = [frame]
        results = self.model(frame)
        labels, cord = results.xyxyn[0][:, -1], results.xyxyn[0][:, :-1]
        return labels, cord

    def class_to_label(self, x):
        """
        For a given label value, return corresponding string label.
        :param x: numeric label
        :return: corresponding string label
        """
        return self.classes[int(x)]
    
    def getCity(self,latitude, longitude):
        geolocator = Nominatim(user_agent="my_geocoder")
        # Reverse geocode the coordinates to get the city name
        location = geolocator.reverse(f"{latitude}, {longitude}", language='en')
        address = location.raw['address']
        city = address.get('city', '')
        # print(f"City: {city}")
        return city

    def getLocation(self):
        options = Options()
        options.add_argument("--use--fake-ui-for-media-stream")
        service = Service('./chromedriver.exe') # Edit path of chromedriver accordingly
        driver = webdriver.Chrome(service=service, options=options)

        driver.get("https://www.gps-coordinates.net/my-location")
        t.sleep(5)
        longitude = driver.find_element(By.ID, 'lng').text.split("/")[0]
        latitude = driver.find_element(By.ID, 'lat').text.split("/")[0]
        driver.quit()    
        return (latitude,longitude)
    
    def getTime(self):
        today = datetime.now()
        current_day = today.day
        

    def writeLocation(self):
        location = {
            "latitude": 0,
            "longitude": 0,
            "frequency": 1,
            "city": "Null",
            "day":"Null",
            "time":"Null",
        }
        latitude, longitude = self.getLocation()

        location["latitude"] = latitude
        location["longitude"] = longitude
        location["city"] = self.getCity(latitude, longitude)
        # Get the current date
        today = datetime.now()
        location['day'] = today.strftime("%A")  # Extract the day from the current date
        location['time'] = today.strftime("%H:%M:%S")   # Format the current time as "HH:MM:SS"
        
        # Open the JSON file and load its contents
        with open('../frontend/src/Components/locations.json', 'r') as f:
            data = json.load(f)
            # print("\n Data loaded:", data)

        # Check if the same latitude and longitude already exist in the file
        found = False
        for obj in data:
            if obj['latitude'] == location['latitude'] and obj['longitude'] == location['longitude']:
                # If they do, update the frequency and set a flag to indicate the object was found
                obj['frequency'] = location['frequency'] + obj['frequency']
                found = True
                break
        
        # If the object was not found, append the new object to the list
        if not found:
            data.append(location)

        modified = os.path.getmtime('../frontend/src/Components/locations.json')    #check when was file last modified
        now = time()
        if now - modified > 30 :   #if last modified was more than 30 seconds
            # Write the updated data back to the file
            with open('../frontend/src/Components/locations.json', 'w') as f:
                json.dump(data, f, indent=4)
                # print("\n Data dumped:", data)
        return location
    
    def screenshot(self, latitude, longitude, frame):
        # the format for storing the images scrreenshotted
        img_name = f'./screenshots/{latitude}+{longitude}.png'
        # saves the image as a png file
        cv2.imwrite(img_name, frame)
        print('screenshot taken')

    def plot_boxes(self, results, frame):
        """
        Takes a frame and its results as input, and plots the bounding boxes and label on to the frame.
        :param results: contains labels and coordinates predicted by model on the given frame.
        :param frame: Frame which has been scored.
        :return: Frame with bounding boxes and labels ploted on it.
        """
        labels, cord = results
        n = len(labels)
        x_shape, y_shape = frame.shape[1], frame.shape[0]
        for i in range(n):
            row = cord[i]
            if row[4] >= 0.3: #if certainty is 0.3
                x1, y1, x2, y2 = int(
                    row[0]*x_shape), int(row[1]*y_shape), int(row[2]*x_shape), int(row[3]*y_shape)
                bgr = (0, 255, 0)
                cv2.rectangle(frame, (x1, y1), (x2, y2), bgr, 2)
                cv2.putText(frame, self.class_to_label(
                    labels[i]), (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 0.9, bgr, 2)
                # print location when detection is made
                location = self.writeLocation()
                print(location)
                #take screenshot
                self.screenshot(location['latitude'],location['longitude'],frame)



        return frame

    def __call__(self):
        """
        This function is called when class is executed, it runs the loop to read the video frame by frame,
        and write the output into a new file.
        :return: void
        """
        cap = self.get_video_capture()
        assert cap.isOpened()

        while True:

            ret, frame = cap.read()
            assert ret

            frame = cv2.resize(frame, (416, 416))

            start_time = time()
            results = self.score_frame(frame)

            frame = self.plot_boxes(results, frame)

            end_time = time()
            fps = 1/numpy.round(end_time - start_time, 2)
            # print(f"Frames Per Second : {fps}")

            cv2.putText(frame, f'FPS: {int(fps)}', (20, 70),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 255, 0), 2)

            cv2.imshow('YOLOv5 Detection', frame)

            if cv2.waitKey(5) & 0xFF == 27:
                break

        cap.release()


# Create a new object and execute.
detector = TrashDetection(
    capture_index=0, model_name='C:/Users/ahmed/OneDrive/Documents/FYP/backend/best.pt')
detector()
