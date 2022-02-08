from PIL import Image,JpegImagePlugin
def quantTable(file):
    """Function that returns the jpeg quantization tables and the jpeg sampling type"""
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
