<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <title>Session.php</title>
  </head>
  <body>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    
 <div class="container mt-3">
    <form action="session.php" method="post">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" name="name" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name" required>
        </div>

        <div class="form-group">
          <label for="roll">Roll:</label>
          <input type="text" name="roll" class="form-control" id="roll" placeholder="Roll" required>
        </div>

        <div class="form-group">
          <label for="mark">Mark:</label>
          <input type="number" name="mark" class="form-control" id="mark" placeholder="Mark" required>
        </div>

        <button type="submit" name="details" class="btn btn-primary">Submit</button>

      </form>
    </div>
    <hr class="my-12"/>
    
    <?php
      session_start();
      if (isset($_POST["details"])) {
        $_SESSION["name"][] = $_POST["name"];
        $_SESSION["roll"][] = $_POST["roll"];
        $_SESSION["mark"][] = $_POST["mark"];


        print_r($_SESSION['name']);
        print_r($_SESSION['roll']);
        print_r($_SESSION['mark']);
        foreach ($_SESSION['name'] as $i) {
          echo $i."<br>";
        }
        foreach ($_SESSION['roll'] as $j) {
          echo $j."<br>";
        }
        foreach ($_SESSION['mark'] as $k) {
          echo $k."<br>";
        }
      }
    ?>
   
</body>
</html>