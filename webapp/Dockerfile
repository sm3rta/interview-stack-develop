# pull official base image
FROM node:17-alpine3.12

# set working directory
WORKDIR /webapp

# add `/app/node_modules/.bin` to $PATH
ENV PATH /webapp/node_modules/.bin:$PATH

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "run", "start"]