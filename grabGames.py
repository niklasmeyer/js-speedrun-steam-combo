from urllib2 import Request, urlopen, URLError
import json
import mysql.connector

config = {
	'user': 'root',
	'password': 'root',
	'host': '127.0.0.1',
	'database': 'wcisr'
}

cnx = mysql.connector.connect(**config)
cursor = cnx.cursor()

result = []
url = 'http://www.speedrun.com/api/v1/games?_bulk=yes&max=1000'

def putGameInfoIntoResult(request, j):
	print 'Page', j+1
	offset = str(1000*j)
	response = urlopen(Request(url + '&offset=' + offset))
        games_json = json.load(response)
        for i in games_json['data']:
                #print i['names']['international'], '=>', i['id']
		result.append([i['names']['international'], i['id']])
	pagination_links = games_json['pagination']['links'];
	for i in pagination_links:
		if i['rel'] == 'next':
			j += 1
			putGameInfoIntoResult(url, j)


try:
	putGameInfoIntoResult(url, 0)
	truncate = """truncate table name_id_rel""" 
	cursor.execute(truncate)
	cnx.commit()
	for k in result:
		print str(k[0].encode('utf-8').replace("'", r"\'"))
		query = ("INSERT INTO name_id_rel "
                                   "(id, name, s_id) "
                                   "VALUES (NULL, '{}', '{}')"
					.format(
						str(k[0].encode('utf-8').replace("'", r"\'")), 
						str(k[1].encode('utf-8').replace("'", r"\'"))
					)
			)
		try:
			cursor.execute(query)
		except mysql.connector.Error as err:
			print err
	cnx.commit()
	cnx.close()
except URLError, e:
	print 'error'

