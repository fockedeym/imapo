from PIL import Image
import os
import cv2
import numpy as np
import PIL.ExifTags
import PIL.TiffImagePlugin

import exifread
import json

def exif(file):
    """This function the exif information in a json format"""
    img = Image.open(file)
    retval={}
    exif_data = img._getexif()
    if(exif_data is None):
        return "{}"
    for k, v in exif_data.items():
        if k in PIL.ExifTags.TAGS:
            #Some types have to be typecasted in order to be "jsonify"
            if isinstance(v,PIL.TiffImagePlugin.IFDRational):
                v=str(v)
            if isinstance(v,bytes):
                if(PIL.ExifTags.TAGS[k]=="ExifVersion"):
                    v=int(v)
                elif(PIL.ExifTags.TAGS[k]=="ComponentsConfiguration"):
                    v=hexaToExifCompo(v)
                elif(PIL.ExifTags.TAGS[k]=="FileSource"):
                    v=hexaToExifFileSource(v)
                elif(PIL.ExifTags.TAGS[k]=="SceneType"):
                    v=hexaToExifSceneType(v)
                else:
                    try:
                        v=v.decode("utf-8")
                    except:
                        v="error decoding"
            if (PIL.ExifTags.TAGS[k]=="GPSInfo"):
                v=handleGPSInfoTag(v)
            retval[PIL.ExifTags.TAGS[k]]=v
    json.dumps(retval)
    return 	retval

def handleGPSInfoTag(v):
    newGPSInfo={}
    for key in v.keys():
        decode = PIL.ExifTags.GPSTAGS.get(key,key)
        newGPSInfo[decode] = v[key]
        if isinstance(v[key],bytes):
            newGPSInfo[decode]=int.from_bytes(v[key], byteorder='big')
        if isinstance(v[key],PIL.TiffImagePlugin.IFDRational):
            newGPSInfo[decode]=str(v[key])
        if isinstance(v[key],tuple):
            newGPSInfo[decode]=[str(x) for x in v[key]]
    return newGPSInfo

def hexaToExifCompo(val):
    retval=""
    for b in val:
        if b==1:
            retval+="Y"
        elif b ==2:
            retval+="Cb"
        elif b ==3:
            retval+="Cr"
        elif b ==4:
            retval+="R"
        elif b ==5:
            retval+="G"
        elif b ==6:
            retval+="B"
    return retval
def hexaToExifFileSource(val):
    for b in val:
        if b==1:
            return "Film Scanner"
        elif b ==2:
            return "Reflection Print Scanner"
        elif b ==3:
            return "Digital Camera"
        return ""
def hexaToExifSceneType(val):
    for b in val:
        if b==1:
            return " Directly photographed"
        return ""
