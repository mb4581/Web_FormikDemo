import flask
from flask import Flask, request
from flask_cors import CORS

app = Flask(import_name=__name__)
cors = CORS(app)
store = []


@app.route("/")
@app.route("/<path:path>")
def static_files(path: str = "index.html"):
    return flask.send_from_directory("dist", path)


@app.route("/api/history", methods=["GET"])
def get_history():
    history = []
    for item in store:
        if item is not None:
            history.append(item)
    return {"history": history}


@app.route("/api/history/<int:msg_id>", methods=["GET"])
def get_history_item(msg_id: int):
    if len(store) < msg_id or store[msg_id] is None:
        return {"error": "not found"}, 404
    return store[msg_id], 200


@app.route("/api/history/<int:msg_id>", methods=["DELETE"])
def delete_history_item(msg_id: int):
    if len(store) < msg_id or store[msg_id] is None:
        return {"error": "not found"}, 404
    store[msg_id] = None
    return {"result": True}, 200


@app.route("/api/send", methods=["POST"])
def post_history():
    data = request.json
    assert "title" in data
    assert "message" in data
    row = {
        "id": len(store),
        "title": data["title"],
        "message": data["message"],
    }
    store.append(row)
    return row


app.run()
