"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import jsonify, render_template, request
from flask_cors import cross_origin
from CrudeOilWebAPI import app
import pandas as pd
import os
import json

file_path = r"./CrudeOilWebAPI/RefDocs/Output.xlsx"
data = pd.read_excel(file_path)
df = pd.DataFrame({'Country':data['Country'],'Year':data['Year'],'Demand':data['Demand'] })
@app.route('/')
@cross_origin()
def home():
    df_json = df.to_json(orient='records')
    return jsonify({'data': df_json})

@app.route('/countrynames')
def get_countrynames():
    country_names= df['Country'].unique()
    return json.dumps(country_names.tolist())

@app.route('/countrydata')
def get_countrydata():
    name = request.args.get('Name')
    contryData = df[df['Country']==name]
    df_json = contryData.to_json(orient='records')
    return jsonify({'data':df_json})

@app.route('/loss')
def get_loss():
    file_loss =r"./CrudeOilWebAPI/RefDocs/loss.xlsx"
    data = pd.read_excel(file_loss)
    df = pd.DataFrame({'Iteration':data['Iteration'],'training_loss':data['training_loss'],'test_loss':data['test_loss']})
    df_json = df.to_json(orient='records')
    return jsonify({'data':df_json})

@app.route('/feature')
def get_feature():
    file_feature =r"./CrudeOilWebAPI/RefDocs/feature.xlsx"
    data=pd.read_excel(file_feature)
    df= pd.DataFrame({'feature_names':data['feature_names'],'feature_importance':data['feature_importance']})
    df_json = df.to_json(orient='records')
    return jsonify({'data':df_json})
                     
    
