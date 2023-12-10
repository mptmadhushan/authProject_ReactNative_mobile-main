import React, { useRef } from 'react';
import { View } from 'react-native';


const FaceRecognitionScreen = () => {
  const cameraRef = useRef(null);

  const handleFacesDetected = (faces) => {
    if (faces.length > 0) {
      // Perform action if a face is detected
      console.log('Face detected:', faces);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <RNCamera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.front}
        onFacesDetected={handleFacesDetected}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications.all
        }
      /> */}
     
    </View>
  );
};

export default FaceRecognitionScreen;
