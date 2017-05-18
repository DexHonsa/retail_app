#!/bin/bash
cd /home/deployretail/retail_app
export NODE_ENV=production
npm run server
# Uncomment below link if server is listining to 3000 port instead of 9000
# npm start