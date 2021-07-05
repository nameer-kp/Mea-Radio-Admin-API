cd $1;pidof ffmpeg | xargs kill -9 ;rm mylist.txt;rm song.mp3;for f in *.mp3; do echo "file '$f'" >> mylist.txt; done
ffmpeg -f concat -safe 0 -i mylist.txt -c copy song.mp3;
ffmpeg -re -stream_loop -1 -i song.mp3 -c copy -f rtsp rtsp://localhost:8554/mystream;
