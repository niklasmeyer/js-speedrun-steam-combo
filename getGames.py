import falcon
import json
import mysql.connector

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

 
api = falcon.API()
api.add_route('/games/', getAllGames())
