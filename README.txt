HOW TO ADD YOUR OWN PHOTOS AND MUSIC
=====================================

1) PHOTOS
   - Put your real photos in this "assets/photos" folder, e.g.:
       assets/photos/photo1.jpg
       assets/photos/photo2.jpg
   - Then open index.html and find the "GALLERY" section.
   - Each photo placeholder looks like this:
       <span class="polaroid-photo gph-1">📷</span>
   - Replace it with an <img> tag, for example:
       <img src="assets/photos/photo1.jpg" alt="Our school days" class="polaroid-img">
   - Do the same for the timeline "Chapter" photos if you'd like real photos there too
     (look for .polaroid-photo ph-1, ph-2, etc. in index.html).
   - Optional: add this small bit of CSS to style.css so images fill the frame nicely:
       .polaroid-img{ width:100%; height:100%; object-fit:cover; border-radius:2px; }

2) MUSIC
   - Add your song file here as: assets/song.mp3
   - The website already looks for it automatically (see the <audio> tag in index.html).
   - The music never plays automatically — she has to tap the little note button
     in the top-right corner herself.

3) DEPLOYING TO GITHUB PAGES
   - Create a new GitHub repository and upload index.html, style.css, script.js,
     and this whole "assets" folder (keep the same folder structure).
   - In the repo, go to Settings > Pages, choose the "main" branch and "/ (root)"
     folder, and save.
   - GitHub will give you a link like https://yourusername.github.io/repo-name/
     — that's the link you can send her.
