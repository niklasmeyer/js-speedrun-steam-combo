import falcon
from falcon_cors import CORS
import json
import mysql.connector

cors = CORS(allow_all_origins=True)

class getAllGames:
	def on_get(self, req, resp):
		games = []

		config = {
 			'user': 'root',
		        'password': 'root',
		        'host': '127.0.0.1',
		        'database': 'wcisr'
		}
                cnx = mysql.connector.connect(**config)
                cursor = cnx.cursor(buffered=True)

                selectAllGames = """SELECT * FROM name_id_rel"""
		cursor.execute(selectAllGames)
                cnx.commit()
		for row in cursor:
			games.append(row)
                cnx.close()

		resp.status = falcon.HTTP_200
		resp.body = json.dumps(games)

 
api = falcon.API(middleware=[cors.middleware])
api.add_route('/games/', getAllGames())
