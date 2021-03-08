### Get started

1 - docker-compose up <br />
2 - import mysql DB file in phpmyadmin http://localhost:8081/ (user: root psw: MYSQL_ROOT_PASSWORD) <br />

phpmyadmin: http://localhost:8081/ (user: root psw: MYSQL_ROOT_PASSWORD) <br />
backend: http://localhost:5000/ <br />
frontend: http://localhost:3000/ <br />

### Request example

create Vehicle:<br />

curl --location --request POST 'http://localhost:5000/api/vehicle' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2MTk5OTk5LCJpYXQiOjE2MTQ4OTQwNjR9.VlKZ_q20ogmi7bmxkHy7Fb4GOkoJQ_Flr4vO_3J9F7Q' \
--header 'Content-Type: application/json' \
--data-raw '{
"id": 183456199999
}'<br />

read Vehicles: <br />

curl --location --request GET 'http://localhost:5000/api/vehicle?offset=0&limit=5' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTQ4OTE2OTR9.DV5QuzxD0iHPUfM07HjZ99JdVOhYBSJvy9mfdoHBHls'<br />

update Location: <br />

curl --location --request PUT 'http://localhost:5000/api/location' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2MTk5OTk5LCJpYXQiOjE2MTQ4OTQwNjR9.VlKZ_q20ogmi7bmxkHy7Fb4GOkoJQ_Flr4vO_3J9F7Q' \
--header 'Content-Type: application/json' \
--data-raw '{
"latLong": [58.0755381, 16.5555555],
"date": "2021-02-20",
}'<br />

read Locations: <br />

curl --location --request GET 'http://localhost:5000/api/location/123416999999?start=2021-01-04&end=2021-03-04&offset=0&limit=50' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTQ4OTE2OTR9.DV5QuzxD0iHPUfM07HjZ99JdVOhYBSJvy9mfdoHBHls'<br />

### Tests

Tests BE: docker exec -it 092800b8c37c bash && yarn test
