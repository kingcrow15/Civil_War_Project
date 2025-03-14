from flask import Flask, jsonify, render_template, url_for
import monument_count

app = Flask(__name__)


@app.route("/")
@app.route("/home")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template('about.html')

@app.route("/download")
def download():
    return render_template('download.html')

@app.route("/api/v1.0/bargraph")
def bargraph():
    mongodata = monument_count.getnumber()
    return jsonify(mongodata)

# @app.route("/search")
# def search():
#     return render_template('search.html')

if __name__ == '__main__':
    app.run(debug=True)