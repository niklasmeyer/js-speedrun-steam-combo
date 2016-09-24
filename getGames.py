import falcon
from falcon_cors import CORS
import json
import mysql.connector
from urllib2 import Request, urlopen, URLError

cors = CORS(allow_all_origins=True)

class getSpeedrunGames:
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

class getSpeedrunGameByName:
	def on_get(self, req, resp):
		game = ['wip']
		resp.status = falcon.HTTP_200
		resp.body = json.dumps(game)

class getSteamLibraryForCommunityId:
	def on_get(self, req, resp, communityid):
		games = []
		url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=5C5429F3E3641B001B1FADC1F34D0094&include_appinfo=1&steamid={}&include_played_free_games=1'			   .format(communityid)

		try:
			response = urlopen(Request(url))
			games_json = json.load(response)
			for i in games_json['response']['games']:
				games.append(i['name'])
		except URLError, e:
			print 'error'		

		resp.status = falcon.HTTP_200
		resp.body = json.dumps(games)

 
api = falcon.API(middleware=[cors.middleware])
api.add_route('/speedrun/all', getSpeedrunGames())
api.add_route('/speedrun/game/{name}', getSpeedrunGameByName())
api.add_route('/steam-game-library/{communityid}', getSteamLibraryForCommunityId())
