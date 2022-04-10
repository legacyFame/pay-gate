names='utils routes models controllers'
dirs=ls | grep .js
for name in $dirs
do
echo $name
done