from PIL import Image
import os
import numpy as np

def crop(file,xstart,xend,ystart,yend):
	im = Image.open(file)
	imnp=np.array(im, np.uint8)
	print(imnp.shape)
	print(imnp[1,1])
	out = cropUpdate(imnp,xstart-1,xend-1,ystart-1,yend-1)
	print(out[1,1])

	out = Image.fromarray(out)
	return out

def cropUpdate(array, xstart,xend,ystart,yend):
	if(len(array.shape)==2):
		return array[ystart:yend,xstart:xend]
	else:
		return array[ystart:yend,xstart:xend,:]

#crop(os.path.join(os.getcwd(),'flask','images','logo.jpg'),1,85,1,85).save(os.path.join(os.getcwd(),'flask','images','crop.jpg'))
