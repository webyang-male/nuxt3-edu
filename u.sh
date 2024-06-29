info=$1
if ["$info" = ""];
then info="feat:Update project dependencies and implement post publishing and comment functions"
fi
git add -A
git commit -m "$info"
git push origin main