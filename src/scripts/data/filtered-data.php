<?php

<!-- API from BPBD -->
$BASE_URL =  '';
$USERNAME = '';
$PASSWORD = '';
$APIKEY = '';

$curl = curl_init();

$ch = curl_init($BASE_URL);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/xml', $additionalHeaders));
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_USERPWD, $USERNAME . ":" . $PASSWORD);
// curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payloadName);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
$return = curl_exec($ch);
curl_close($ch);

<!-- Use data.json for local development -->
<!-- delete code above and change $return below to get_content('./src/scripts/data/data.json') -->

$json= json_decode($return);

$threeDays = date('Y-m-d h:i:s', strtotime('-3 days'));
$filteredArray = array();
foreach($json->data as $mydata)
{

  if($threeDays < $mydata->eventdate || $mydata->status == "BELUM") {
    array_push($filteredArray, $mydata);
  }
}
$data = json_encode($filteredArray);


header("Content-Type: application/json");
echo $data;
?>


