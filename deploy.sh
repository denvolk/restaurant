#!/usr/bin/env sh
read -p "Build? Y/N: " VAR1
# abort on errors
set -e
# build
if [ "$VAR1" = "Y" ]; then
  echo "build"
  npm run build
else
  echo "dont build"
fi
#npm run build
# navigate into the build output directory
cd dist
# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:denvolk/restaurant.git master:gh-pages
cd -