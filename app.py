from flask import Flask, render_template
from logging import debug
from flask_pymongo import PyMongo
from werkzeug.utils import append_slash_redirect, redirect
from script import api_call
# import easygui

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')

@app.route("/script")
def script():
    api_call()
    # easygui.msgbox("Database Updated Successfully!", "Success")
    return redirect("/")

@app.route("/heatmap")
def heatmap():
    return render_template('heatmap.html')
       

if __name__ == '__main__':
    app.run()