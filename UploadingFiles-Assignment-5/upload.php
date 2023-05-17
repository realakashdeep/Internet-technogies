<?php

$info = $_FILES["fn"];

foreach ($info as $x => $y) {
    print("$x: ");
    foreach ($y as $z) {
        print "$z, ";
    }
    print("<br>");
}
print("<hr>");

$n = count($info["name"]);
for ($i = 0; $i < $n; $i++) {
    if (!$info["error"][$i]) {
        $t = "upload/" . $info["name"][$i];
        $m = preg_match("/\.(php|html|js|xml)$/", $info["name"][$i]);
        if ($m && move_uploaded_file($info["tmp_name"][$i], $t)) {
            print("File uploaded to $t<br>");
        } else {
            print("File " . $info["name"][$i] . " is not of allowed type.<br>");
        }
    } else {
        print("There is an error for " . $info["name"][$i] . "<br>");
    }
}

?>
