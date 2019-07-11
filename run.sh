# docker build --no-cache -t dogs-cats-website-image .
docker build -t dogs-cats-website-image .
docker rmi $(docker images | grep '^<none>' | awk '{print $3}')
docker run -d -p 80:80 --name dogs-cats-website dogs-cats-website-image