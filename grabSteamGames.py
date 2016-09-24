from urllib2 import Request, urlopen, URLError
import json
import sys

result = []
url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=5C5429F3E3641B001B1FADC1F34D0094&include_appinfo=1&steamid={}&include_played_free_games=1'.format(sys.argv[1])

try:
	response = urlopen(Request(url))
	games_json = json.load(response)
	for i in games_json['response']['games']:
		print i['name']
		#result.append([i['names']['international'], i['id']])

except URLError, e:
	print 'error'

