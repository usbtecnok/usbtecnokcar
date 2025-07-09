from flask import Flask, render_template, request, redirect, url_for
import mysql.connector

app = Flask(__name__)

# Conexão com o banco
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="@#*Z4939ia4",  # coloque sua senha aqui
    database="usbtecnokcar"
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/pedido', methods=['POST'])
def pedido():
    origem = request.form.get('origem')
    destino = request.form.get('destino')

    cursor = db.cursor()
    sql = "INSERT INTO corridas (origem, destino) VALUES (%s, %s)"
    cursor.execute(sql, (origem, destino))
    db.commit()
    corrida_id = cursor.lastrowid
    cursor.close()

    return redirect(url_for('request_status', corrida_id=corrida_id))

@app.route("/request/<int:corrida_id>")
def request_status(corrida_id):
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM corridas WHERE id = %s", (corrida_id,))
    corrida = cursor.fetchone()
    cursor.close()

    if not corrida:
        return "Corrida não encontrada"

    return render_template("request.html", corrida=corrida)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)
