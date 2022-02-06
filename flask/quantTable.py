from PIL import Image,JpegImagePlugin
import os
import cv2
import numpy as np
from io import BytesIO
import matplotlib.pyplot as plt
def quantTable(file):
    img = Image.open(file)
    sampling="No sampling"
    tables=img.quantization
    samplingVal=JpegImagePlugin.get_sampling(img)
    if(samplingVal==0):
        sampling="4:4:4"
    elif(samplingVal==1):
        sampling="4:2:2"
    elif(samplingVal==2):
        sampling="4:2:0"
    return (tables, sampling)

#quantTable(os.path.join(os.getcwd(),'flask',"images",'soleil.jpg'))
