#!/bin/bash
for i in {1..40}
do
   curl https://thispersondoesnotexist.com/image?rand=$i --output "../public/avatars/$i.jpg"
   sleep 10
done
