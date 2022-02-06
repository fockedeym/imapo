from PIL import Image
import os
import cv2
import numpy as np

def histoEqual(file,selectedDomain):
    im = Image.open(file)
    img=np.array(im)
    if(len(img.shape)==2):
        img=np.stack((img,)*3, axis=-1)
    if selectedDomain == "YUV":
        img = cv2.cvtColor(img, cv2.COLOR_RGB2YUV)
        img[:,:,0] = cv2.equalizeHist(img[:,:,0])
        img = cv2.cvtColor(img, cv2.COLOR_YUV2RGB)
    elif selectedDomain == "GRAY":
        img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        img[:,:] = cv2.equalizeHist(img[:,:])
    elif selectedDomain == "RGB":
        img[:,:,0] = cv2.equalizeHist(img[:,:,0])
        img[:,:,1] = cv2.equalizeHist(img[:,:,1])
        img[:,:,2] = cv2.equalizeHist(img[:,:,2])
    elif selectedDomain == "HSV":
        img = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)
        img[:,:,2] = cv2.equalizeHist(img[:,:,2])
        img = cv2.cvtColor(img, cv2.COLOR_HSV2RGB)
    else:
        print("default")
        pass
    return 	Image.fromarray(img)



#histoEqual(os.path.join(os.getcwd(),'flask','gris.jpeg'),"GREY").save(os.path.join(os.getcwd(),'flask','gris2.jpg'))
