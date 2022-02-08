from flask import Flask, request,send_file,jsonify
from brightness import brightness
from crop import crop
from histoEqual import histoEqual
from filter import filter
from domain import domain
from ela import ela
from histoStretch import histoStretch
from resize import resize
from exif import exif
from xmp import xmp
from quantTable import quantTable
import os
from io import BytesIO
from base64 import encodebytes
from modelCollection import ModelCollection
app = Flask(__name__)

modelCollection=ModelCollection("./")

@app.route("/api/upload", methods=["POST"])
def save():
    file=request.files['fileKey']
    request.files['fileKey'].save(os.path.join(os.getcwd(),"data","upload",file.filename))
    return ( {},200,{'content-type': 'application/json'})


@app.route("/api/bright", methods=["POST"])
def bright():
        file=request.files['fileKey']
        brightnessFactor=float(request.form.get('brightnessFactor'))
        image=brightness(file,brightnessFactor)
        return serve_pil_image(image)

@app.route("/api/crop", methods=["POST"])
def croping():
        file=request.files['fileKey']
        xstart=int(request.form.get('xstart'))
        xend=int(request.form.get('xend'))
        ystart=int(request.form.get('ystart'))
        yend=int(request.form.get('yend'))
        image=crop(file,xstart,xend,ystart,yend)
        return serve_pil_image(image)

@app.route("/api/histoEqual", methods=["POST"])
def histoEqualization():
        file=request.files['fileKey']
        selectedDomain=str(request.form.get('selectedDomain').strip("\""))
        image=histoEqual(file,selectedDomain)
        print(image)
        return serve_pil_image(image)

@app.route("/api/histoStretch", methods=["POST"])
def histoStretching():
        file=request.files['fileKey']
        selectedDomain=str(request.form.get('selectedDomain').strip("\""))
        image=histoStretch(file,selectedDomain)
        return serve_pil_image(image)

@app.route("/api/resize", methods=["POST"])
def resizing():
        file=request.files['fileKey']
        print(request.form.get('x'))
        x=float(request.form.get('x'))
        y=float(request.form.get('y'))
        resizeType=str(request.form.get('resizeType').strip("\""))
        image=resize(file,resizeType,x,y)
        return serve_pil_image(image)
@app.route("/api/ela", methods=["POST"])
def ErrorLevelAnalysis():
        file=request.files['fileKey']
        quality=int(request.form.get('quality'))
        scale=float(request.form.get('scale'))
        image=ela(file,quality,scale)
        return serve_pil_image(image)

@app.route("/api/quantTable", methods=["POST"])
def getQuantTables():
        file=request.files['fileKey']
        tables,sampling=quantTable(file)
        return jsonify({'tables': tables,
                        'sampling': sampling})

@app.route("/api/domain", methods=["POST"])
def domaining():
        file=request.files['fileKey']
        images=domain(file)
        encoded_imges = []
        for image in images:
            encoded_imges.append(get_response_image(image))
        return jsonify({'result': encoded_imges})

@app.route("/api/exif", methods=["POST"])
def getExif():
        file=request.files['fileKey']
        exifData=exif(file)
        return jsonify(exifData)

@app.route("/api/xmp", methods=["POST"])
def getXmp():
        file=request.files['fileKey']
        xmpData=xmp(file)
        return jsonify({'xmp':xmpData})

@app.route("/api/filter", methods=["POST"])
def filtering():
    file=request.files['fileKey']
    filterKernel=request.form.get('filter')
    image=filter(file, filterKernel)
    return serve_pil_image(image)

@app.route("/api/humanSeg", methods=["POST"])
def HumanSegmentation():
    file=request.files['fileKey']
    image=modelCollection.humanSeg.infer(file)
    return serve_pil_image(image)

def get_response_image(pil_img):
    byte_arr = BytesIO()
    pil_img.save(byte_arr, format='PNG') # convert the PIL image to byte array
    encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64
    return encoded_img

def serve_pil_image(pil_img):
    img_io = BytesIO()
    pil_img.save(img_io,'PNG')
    img_io.seek(0)
    return send_file(img_io,mimetype='image/png')
