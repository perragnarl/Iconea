<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Ikonica</title>
    <link rel="stylesheet" href="ikonica.css">
    <link href="https://fonts.googleapis.com/css?family=Baloo+Bhai" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <div class="inner">
      <h1>Ikonica</h1>
      <h2>Optimized</h2>
      <?php
      $numberOfIcons = 0;
      $iconName = '';
      foreach(glob('./icons/optimized/*.svg') as $path){
        $iconName = basename($path, ".svg");
        echo '<div data-name="' . $iconName . '" class="icon"><img src="' . $path . '" width="24" /><span class="search">' . $iconName . '</span></div>';
        $numberOfIcons++;
      }
      echo '<div class="num">' . $numberOfIcons . '</div>';
      ?>
      <hr />
      <?php
        foreach(glob('./icons/*.svg') as $path){
            $iconName = basename($path, ".svg");
            echo '<div data-name="' . $iconName . '" class="icon"><img src="' . $path . '" width="24" /><span class="search">' . $iconName . '</span></div>';
            $numberOfIcons++;
        }
      ?>
    </div>
  </body>
</html>
