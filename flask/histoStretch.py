from PIL import Image
import cv2
import numpy as np

def histoStretch(file,selectedDomain):
    im = Image.open(file)
    img=np.array(im)
    if(len(img.shape)==2):
        img=np.stack((img,)*3, axis=-1)
    if selectedDomain == "YUV":
        img = cv2.cvtColor(img, cv2.COLOR_RGB2YUV)
        img[:,:,0] = stretch(img[:,:,0])
        img = cv2.cvtColor(img, cv2.COLOR_YUV2RGB)
    elif selectedDomain == "GRAY":
        img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        img[:,:] = stretch(img[:,:])
    elif selectedDomain == "RGB":
        img[:,:,0] = stretch(img[:,:,0])
        img[:,:,1] = stretch(img[:,:,1])
        img[:,:,2] = stretch(img[:,:,2])
    elif selectedDomain == "HSV":
        img = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)
        img[:,:,2] = stretch(img[:,:,2])
        img = cv2.cvtColor(img, cv2.COLOR_HSV2RGB)
    else:
        pass
    return 	Image.fromarray(img)


def stretch(img):
    minVal=np.min(img)
    maxVal=np.max(img)
    retval=((img-minVal)/(maxVal-minVal))*255
    return retval.astype(np.uint8)
