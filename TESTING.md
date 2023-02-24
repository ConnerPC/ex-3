# Curl tests
## Successful POST test
```
curl -X POST -d 'firstName=Caleb&lastName=Jones&grade=10&email=abejones@gmail.com&shirtSize=S&hrUsername=cjones' http://164.92.137.70/registrations
```
## Successful GET test
```
curl -X GET http://164.92.137.70/registrations
```
## Missing parameter POST test (no hrUsername)
```
curl -X POST -d 'firstName=Abe&lastName=Jones&grade=10&email=abejones@gmail.com&shirtSize=S' http://164.92.137.70/registrations
```
## Invalid shirt size POST test
```
curl -X POST -d 'firstName=Abe&lastName=Jones&grade=10&email=abejones@gmail.com&shirtSize=V&hrUsername=ajones' http://164.92.137.70/registrations
```
## Invalid grade POST test
```
curl -X POST -d 'firstName=Abe&lastName=Jones&grade=8&email=abejones@gmail.com&shirtSize=S&hrUsername=ajones' http://164.92.137.70/registrations
```