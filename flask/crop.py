from PIL import Image
import numpy as np

def crop(file,xstart,xend,ystart,yend):
	im = Image.open(file)
	imnp=np.array(im, np.uint8)
	cropim = cropUpdate(imnp,xstart-1,xend-1,ystart-1,yend-1)
	return Image.fromarray(cropim)

def cropUpdate(array, xstart,xend,ystart,yend):
	if(len(array.shape)==2):
		return array[ystart:yend,xstart:xend]
	else:
		return array[ystart:yend,xstart:xend,:]
