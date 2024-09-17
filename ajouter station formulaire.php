<form method="GET" action="ajouter stations.php">
    station : <input type="text" name="stations" required><br>
    latitude : <input type="text" name="latitude" required><br>
    longitude : <input type="text" name="longitude" required><br>
    Date de création: <input type="date" name="creation_date" required><br>
    <input type="submit" value="ajouter station">
</form>


<?php

//verification du remplissage du formulaire
if (isset($_GET["stations"]) && isset ($_GET["latitude"]) && isset ($_GET["longitude"]) && isset ($_GET["creation_date"])){

    //connection a la base de donnés
$username = "root";
$password = "";
$dbh = new PDO("mysql:host=localhost;dbname=capteur", $username, $password);

echo $sqlRequest = "insert into stations(name,latitude,longitude,creation_date)
               values('{$_GET['stations']}' , '{$_GET['latitude']} ' , '{$_GET['longitude']} ' ,'{$_GET['creation_date']}')";

$dbh->exec($sqlRequest);

}