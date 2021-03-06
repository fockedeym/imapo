from PIL import Image
import numpy as np

def brightness(file,brightnessFactor):
	im = Image.open(file)
	imnp=np.array(im)
	#If the image is a 2D gray turns it to RGB
	if(len(imnp.shape)==2):
		imnp=np.stack((imnp,)*3, axis=-1)
	out = brightUpdate(imnp,brightnessFactor)
	out = Image.fromarray(out)
	return out

def brightUpdate(color, brightnessFactor):
	scaledValue = color*(1 + brightnessFactor)
	#If the image is RGBA conserves the A
	if color.shape[2]==4:
			scaledValue[:,:,-1] = color[:,:,-1]
	#Threshold value to keep them in uint8 range
	scaledValue[scaledValue<0] = 0
	scaledValue[scaledValue>255] = 255
	return scaledValue.astype(np.uint8)
