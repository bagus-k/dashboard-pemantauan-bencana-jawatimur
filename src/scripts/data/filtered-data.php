<?php
$json= json_decode(file_get_contents("data.json"));
$week = date('Y-m-d h:i:s', strtotime('-10 days'));
$filteredArray = array();
foreach($json->data as $mydata)
{

  if($week < $mydata->eventdate) {
    array_push($filteredArray, $mydata);
  }
}
$data = json_encode($filteredArray);


header("Content-Type: application/json");
echo $data;
?>


