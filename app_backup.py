from flask import Flask, render_template, request
import mysql.connector

app = Flask(__name__)

# Configuração do banco de dados
db_config = {
    'host': 'localhost',
    'user': 'tecnok',
    'password': '123456',
    'database': 'usbtecnokcar'
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/pedido', methods=['POST'])
def pedido():
    origem = request.form.get('origem')
    destino = request.form.get('destino')

    try:
        conexao = mysql.connector.connect(**db_config)
        cursor = conexao.cursor()
        cursor.execute("INSERT INTO pedidos (origem, destino) VALUES (%s, %s)", (origem, destino))
        conexao.commit()
        cursor.close()
        conexao.close()
        return f'<h2>Corrida solicitada de <strong>{origem}</strong> para <strong>{destino}</strong>.</h2><a href="/">Voltar</a>'
    except mysql.connector.Error as err:
        return f'<h2>Erro ao salvar pedido: {err}</h2><a href="/">Voltar</a>'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
